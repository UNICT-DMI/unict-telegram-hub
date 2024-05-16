'use server';

import { Entity, entities } from '@/app/telegram/models';
import getBachelorGroups from './bachelor';
import getBots from './bots';
import getChannels from './channels';
import getMasterGroups from './master';

export async function loadCards(
  chosenEntityType: (typeof entities)[number]
): Promise<undefined | ReadonlyArray<Entity>> {
  let newData: undefined | ReadonlyArray<Entity>;

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
      newData = undefined;
  }

  return newData;
}
