import { load } from 'cheerio';
import { accessSync, constants, mkdirSync, readFileSync, statSync, writeFile } from 'fs';
import { get } from 'https';
import { Base, Group, GroupsDictionaryValue } from './models';

const cachedDataFolderPath = './cachedData';

function log(type: 'log' | 'warn' | 'error', value: unknown) {
  console[type](value);
}

function isGroupEntitiesType(entitiesType: EntitiesType) {
  return ['groups', 'bachelor', 'master'].includes(entitiesType);
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
        `https://t.me/${isGroupEntitiesType(entitiesType) ? 'joinchat/' : ''}${suffix}`
      )
    )
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

export async function getData(
  entitiesType: EntitiesType,
  entities: ReadonlyArray<string | GroupsDictionaryValue>,
  groupsYear?: string
): Promise<Array<BaseWithScore>> {
  const isGroupEntitiesTypeResult = isGroupEntitiesType(entitiesType);

  const cachedDataPath = `${cachedDataFolderPath}/${entitiesType}${
    isGroupEntitiesTypeResult && groupsYear ? '/' + groupsYear : ''
  }`;

  if (shouldUpdateCache(cachedDataPath)) {
    let entitiesArray: ReadonlyArray<string>;

    if (isGroupEntitiesTypeResult) {
      entitiesArray = (entities as ReadonlyArray<GroupsDictionaryValue>).map(
        entity => entity.suffix
      );
    } else {
      entitiesArray = entities as ReadonlyArray<string>;
    }

    const entitiesData: Array<BaseWithScore> = await fetchEntitiesData(
      entitiesType,
      entitiesArray
    ).catch(() => {
      log('error', 'Failed fetching the entities data');
      return [];
    });

    if (isGroupEntitiesTypeResult) {
      const groupsDictionaryValues = entities as ReadonlyArray<GroupsDictionaryValue>;

      (entitiesData as Array<GroupWithScore>).forEach((entity, index) => {
        entity.code = groupsDictionaryValues[index].teamsCodes[0];
        entity.mz_code = groupsDictionaryValues[index].teamsCodes[1];
      });
    }

    sortData<BaseWithScore>(entitiesData, 'score');
    cacheData<BaseWithScore>(cachedDataPath, entitiesData);

    return entitiesData;
  } else {
    log('log', `Returning cached data for: ${entitiesType}`);

    return JSON.parse(readFileSync(cachedDataPath).toString()) as Array<BaseWithScore>;
  }
}

type EntitiesType = 'channels' | 'bots' | 'groups' | 'bachelor' | 'master';

export type BaseWithScore = Base & { score?: number };

export type GroupWithScore = BaseWithScore & Omit<Group, 'members'>;
