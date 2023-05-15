import { NextApiRequest, NextApiResponse } from 'next';
import { Bot } from '../../models/api/Entity';
import { BaseWithScore, getData } from '../../shared/api';

const botsNames: ReadonlyArray<string> = [
  'DMI_Bot',
  'Spotted_DMI_bot',
  'MedBot',
  'ERSUBot'
] as const;

function toBotEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Bot> {
  return entitiesData.map<Bot>(entity => {
    return entity;
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReadonlyArray<Bot>>
) {
  res.json(toBotEntities(await getData('bots', botsNames)));
}
