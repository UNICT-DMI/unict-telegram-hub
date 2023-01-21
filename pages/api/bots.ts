import { NextApiRequest, NextApiResponse } from 'next';
import { Bot } from '../../models/api/Entity';
import { BaseWithScore, getData } from '../../shared/api';

const botsNames: ReadonlyArray<string> = [
  'DMI_Bot',
  'Spotted_DMI_bot',
  'MedBot',
  'ERSU_Bot'
] as const;

function toBotEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Bot> {
  return entitiesData.map<Bot>(entity => {
    return entity;
  });
}

function returnBotEntities(
  channelEntities: Array<BaseWithScore>,
  res: NextApiResponse<ReadonlyArray<Bot>>
): void {
  res.json(toBotEntities(channelEntities));
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Bot>>) {
  getData('bots', botsNames, returnBotEntities, res);
}
