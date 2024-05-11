import { Channel } from '../models';
import { BaseWithScore, getData } from './api';

const channelsNames: ReadonlyArray<string> = [
  'dminews',
  'fisicact',
  'dieeinews',
  'deinews',
  'infoDSC',
  'lexunictnews',
  'biogeonews',
  'biometecnews',
  'dspsnews',
  'disumnews',
  'medicina_unict',
  'disfornews',
  'medclinnews',
  'dgfinews',
  'dsfnews',
  'sdslinguenews',
  'dicarnews',
  'ersunews',
  'bio_unict',
  'geo_unict',
  'scienze_ambientali',
  'terapia_unict',
  'Servizio_Sociale_Sociologia_news',
  'lettere_unict',
  'filosofia_unict',
  'IngInfoNews',
  'IngEleNews',
  'IngIndNews',
  'Spotted_DMI',
  // 'SfottedDIEEI',
  'sdsarchitetturanews',
  'albo_unict',
  'unict_devs',
  'OpenJobDMI',
  'Ask_DMI'
] as const;

function toChannelEntities(entitiesData: Array<BaseWithScore>): ReadonlyArray<Channel> {
  return entitiesData.map<Channel>(entity => {
    const score = entity.score ?? 0;
    delete entity.score;

    const channelEntity: Channel = entity as Channel;
    channelEntity.subscribers = score;

    return channelEntity;
  });
}

export default async function getChannels() {
  return toChannelEntities(await getData('channels', channelsNames));
}
