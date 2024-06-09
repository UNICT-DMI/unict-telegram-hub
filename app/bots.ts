import { Bot } from './models';
import { BaseWithScore, getData } from './shared';

const botsNames: ReadonlyArray<string> = [
  'DMI_Bot',
  'Spotted_DMI_bot',
  'MedBot',
  'ERSUBot',
  'Sfotted_DIEEI_bot',
  'UNICT_Book_Market_Bot',
  'Ask_DMI_Bot'
] as const;

function toBotEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Bot> {
  return entitiesData.map<Bot>(entity => {
    return entity;
  });
}

export default async function getBots() {
  return toBotEntities(await getData('bots', botsNames));
}
