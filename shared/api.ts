import { load } from 'cheerio';
import { accessSync, constants, mkdirSync, readFile, statSync, writeFile } from 'fs';
import { get } from 'https';
import { NextApiResponse } from 'next';
import { Base, GroupsDictionaryValue } from '../models/api/Entity';

const cachedDataFolderPath = './cachedData';

function log(type: 'log' | 'warn' | 'error', value: unknown) {
  console[type](value);
}

function shouldUpdateCache(cachedDataPath: string) {
  let shouldUpdate = false;

  const cachedDataFolders = cachedDataPath.substring(0, cachedDataPath.lastIndexOf('/'));

  try {
    accessSync(cachedDataFolders, constants.R_OK | constants.W_OK);
  } catch {
    log('warn', 'Creating cache directory');

    mkdirSync(cachedDataFolders, { recursive: true, mode: 0o666 });
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

function sendHTTPRequest<T>(
  link: string,
  encoding: BufferEncoding = 'utf-8',
  callback: (
    data: string,
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void
  ) => void
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    get(link, res => {
      const chunks: Array<Buffer> = [];

      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      res.on('error', error => {
        reject(error);
      });

      res.on('end', () => {
        callback(Buffer.concat(chunks).toString(encoding), resolve, reject);
      });
    });
  });
}

function fetchData(entitiesType: EntitiesType, link: string): Promise<BaseWithScore> {
  return sendHTTPRequest<BaseWithScore>(link, undefined, (data, resolve, reject) => {
    const $ = load(data);

    const dataNode = $('.tgme_page');
    const commonClassPrefix = 'tgme_page_';

    const entity: BaseWithScore = {
      link: link,
      title: dataNode.find(`.${commonClassPrefix}title`).children().first().text(),
      description: dataNode.find(`.${commonClassPrefix}description`).text()
    };

    if (entitiesType !== 'bots') {
      entity.score = parseInt(dataNode.find(`.${commonClassPrefix}extra`).text().replace(/ /, ''));
    }

    const pictureURL = dataNode.find(`img.${commonClassPrefix}photo_image`).prop('src');
    if (pictureURL?.startsWith('https:')) {
      sendHTTPRequest(pictureURL, 'base64', picture => {
        entity.pictureURL = `data:image/png;base64,${picture}`;
        resolve(entity);
      }).catch(error => {
        log('error', error);
        reject(error);
      });
    } else {
      entity.pictureURL = pictureURL;
      resolve(entity);
    }
  });
}

async function fetchEntitiesData(
  entitiesType: EntitiesType,
  entities: ReadonlyArray<string>
): Promise<Array<BaseWithScore>> {
  log('warn', `Fetching latest data for: ${entitiesType}`);

  return await Promise.all(
    entities.map(suffix =>
      fetchData(
        entitiesType,
        `https://t.me/${['bachelor', 'master'].includes(entitiesType) ? 'joinchat/' : ''}${suffix}`
      )
    )
  );
}

function isGroupsDictionaryValue(
  entity: ReadonlyArray<string | GroupsDictionaryValue>
): entity is ReadonlyArray<GroupsDictionaryValue> {
  return (entity as ReadonlyArray<GroupsDictionaryValue>)[0].teamsCodes != undefined;
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
  entities: ReadonlyArray<string | GroupsDictionaryValue>,
  callback: (
    entitiesData: Array<BaseWithScore>,
    res: NextApiResponse<ReadonlyArray<T>>,
    teamsCodes?: ReadonlyArray<GroupsDictionaryValue['teamsCodes']>
  ) => void,
  res: NextApiResponse<ReadonlyArray<T>>,
  groupsYear?: string
) {
  const cachedDataPath = `${cachedDataFolderPath}/${entitiesType}${
    ['bachelor', 'master'].includes(entitiesType) && groupsYear ? '/' + groupsYear : ''
  }`;

  if (shouldUpdateCache(cachedDataPath)) {
    let entitiesArray: ReadonlyArray<string>;
    let teamsCodesArray: Array<ReadonlyArray<string>>;

    if (isGroupsDictionaryValue(entities)) {
      const tmpEntitiesArray: Array<GroupsDictionaryValue['suffix']> = [];
      teamsCodesArray = [];

      entities.forEach(value => {
        tmpEntitiesArray.push(value.suffix);
        teamsCodesArray.push(value.teamsCodes);
      });

      entitiesArray = tmpEntitiesArray;
    } else {
      entitiesArray = entities as ReadonlyArray<string>;
    }

    fetchEntitiesData(entitiesType, entitiesArray)
      .then(entitiesData => {
        sortData<BaseWithScore>(entitiesData, 'score');
        cacheData<BaseWithScore>(cachedDataPath, entitiesData);

        callback(entitiesData, res, teamsCodesArray);
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

      callback(
        JSON.parse(data.toString()) as Array<BaseWithScore>,
        res,
        isGroupsDictionaryValue(entities) ? entities.map(entity => entity.teamsCodes) : undefined
      );
    });
  }
}

type EntitiesType = 'channels' | 'bots' | 'bachelor' | 'master';

export type BaseWithScore = Base & { score?: number };
