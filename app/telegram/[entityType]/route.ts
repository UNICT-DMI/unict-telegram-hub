import { Base, entities } from '@/app/telegram/models';
import getBachelorGroups from './bachelor';
import getBots from './bots';
import getChannels from './channels';
import getMasterGroups from './master';

export const revalidate = 0;

export async function GET(
  request: Request,
  {
    params
  }: {
    params: { entityType: Lowercase<(typeof entities)[number]> };
  }
) {
  let response: ReadonlyArray<Base>;

  switch (params.entityType) {
    case 'channels':
      response = await getChannels();
      break;
    case 'groups':
      response = [...(await getBachelorGroups()), ...(await getMasterGroups())];
      break;
    case 'bots':
      response = await getBots();
      break;
    default:
      return Response.error();
  }

  return Response.json(response);
}
