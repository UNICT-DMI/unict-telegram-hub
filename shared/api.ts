import { load } from 'cheerio';
import { accessSync, constants, mkdirSync, readFile, statSync, writeFile } from 'fs';
import { get } from 'https';
import { NextApiResponse } from 'next';
import { Base } from '../models/api/Entity';

const cachedDataFolderPath = './cachedData';

function log(type: 'log' | 'warn' | 'error', value: unknown) {
  console[type](value);
}

function shouldUpdateCache(cachedDataPath: string) {
  let shouldUpdate = false;

  try {
    accessSync(cachedDataFolderPath, constants.R_OK | constants.W_OK);
  } catch {
    log('warn', 'Creating cache directory');

    mkdirSync(cachedDataFolderPath, 0o666);
    shouldUpdate = true;
  }

  if (!shouldUpdate) {
    const msInADay = 86400000; // 24 * 60 * 60 * 1000

    try {
      const lastModified = statSync(cachedDataPath).mtimeMs;
      if (Date.now() - lastModified > msInADay) {
        log('warn', 'Obsolete cache');
        shouldUpdate = true;
      }
    } catch {
      shouldUpdate = true;
    }
  }

  return shouldUpdate;
}

function getLinks(
  entitiesType: EntitiesType,
  entities: ReadonlyArray<string>
): ReadonlyArray<string> {
  switch (entitiesType) {
    case 'channels':
    case 'bots':
      return entities.map(name => `https://t.me/${name}`);
    case 'groups':
      return [];
    default:
      log('error', 'Unknown entity type');
      return [];
  }
}

function fetchData(entitiesType: EntitiesType, link: string): Promise<BaseWithScore> {
  return new Promise((resolve, reject) => {
    get(link, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('error', error => {
        reject(error);
      });

      res.on('end', () => {
        const $ = load(data);

        const dataNode = $('.tgme_page');
        const commonClassPrefix = 'tgme_page_';

        const entity: BaseWithScore = {
          link: link,
          pictureURL: dataNode.find(`img.${commonClassPrefix}photo_image`).prop('src'),
          title: dataNode.find(`.${commonClassPrefix}title`).children().first().text(),
          description: dataNode.find(`.${commonClassPrefix}description`).text()
        };

        if (entitiesType !== 'bots') {
          entity.score = parseInt(
            dataNode.find(`.${commonClassPrefix}extra`).text().replace(/ /, '')
          );
        }

        resolve(entity);
      });
    });
  });
}

async function fetchEntitiesData(
  entitiesType: EntitiesType,
  entities: ReadonlyArray<string>
): Promise<Array<BaseWithScore>> {
  log('warn', `Fetching latest data for: ${entitiesType}`);

  return await Promise.all(
    getLinks(entitiesType, entities).map(link => fetchData(entitiesType, link))
  );
}

export function sortData<T>(entitiesData: Array<T>, property: keyof T) {
  entitiesData.sort((a, b) => {
    if (a[property] < b[property]) {
      return 1;
    } else if (a[property] > b[property]) {
      return -1;
    }

    return 0;
  });
}

export function cacheData<T>(path: string, data: ReadonlyArray<T>) {
  log('log', 'Writing new data to cache');

  writeFile(path, JSON.stringify(data), error => {
    if (error) {
      log('error', error.message);
    }
  });
}

export function getData<T>(
  entitiesType: EntitiesType,
  entities: ReadonlyArray<string>,
  callback: (entitiesData: Array<BaseWithScore>, res: NextApiResponse<ReadonlyArray<T>>) => void,
  res: NextApiResponse<ReadonlyArray<T>>
) {
  const cachedDataPath = `${cachedDataFolderPath}/${entitiesType}`;

  if (shouldUpdateCache(cachedDataPath)) {
    fetchEntitiesData(entitiesType, entities)
      .then(entitiesData => {
        sortData<BaseWithScore>(entitiesData, 'score');
        cacheData<BaseWithScore>(cachedDataPath, entitiesData);

        callback(entitiesData, res);
      })
      .catch(() => {
        log('error', 'Failed fetching the entities data');
      });
  } else {
    log('log', `Returning cached data for: ${entitiesType}`);

    readFile(cachedDataPath, (error, data) => {
      if (error) {
        log('error', error.message);
        return undefined;
      }

      callback(JSON.parse(data.toString()) as Array<BaseWithScore>, res);
    });
  }
}

type EntitiesType = 'channels' | 'groups' | 'bots';

export type BaseWithScore = Base & { score?: number };
