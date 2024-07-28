'use server';

import { Entity, entities } from '@/app/models';
import getBots from './bots';
import getChannels from './channels';
import getGroups from './groups';

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
      newData = await getGroups();
      break;
    case 'bots':
      newData = await getBots();
      break;
    default:
      newData = [];
  }

  return newData.filter(entity => entity.title.toLowerCase().includes(filter.toLowerCase()));
}
