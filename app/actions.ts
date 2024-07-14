'use server';

import { Entity, entities } from '@/app/models';
import getBachelorGroups from './bachelor';
import getBots from './bots';
import getChannels from './channels';
import getMasterGroups from './master';

export async function loadCards(
  chosenEntityType: (typeof entities)[number],
  filter: string
): Promise<ReadonlyArray<Entity>> {
  let newData: ReadonlyArray<Entity>;

  switch (chosenEntityType) {
    case 'channels':
      newData = await getChannels();
      break;
    case 'groups':
      newData = [...(await getBachelorGroups()), ...(await getMasterGroups())];
      break;
    case 'bots':
      newData = await getBots();
      break;
    default:
      newData = [];
  }

  return newData.filter(entity => entity.title.toLowerCase().includes(filter.toLowerCase()));
}
