import type { NextApiRequest, NextApiResponse } from 'next';
import { Channel } from '../../models/api/Entity';

async function getData(channelName: string): Promise<Channel> {
  const API = process.env.API + 'api.telegram.php?';
  const promises: Array<Promise<void>> = [];
  const newChannel: Channel = {} as Channel;

  promises.push(
    fetch(`${API}chat=${channelName}`)
      .then(res => res.json())
      .then(data => {
        newChannel.title = data.result.title;
        newChannel.link = `https://t.me/${channelName}`;
        newChannel.description = data.result.description ? data.result.description : '';
        return fetch(`${API}file=${data.result.photo.big_file_id as string}`);
      })
      .then(res => res.json())
      .then(pictureData => {
        newChannel.pictureURL = `${API}path=${pictureData.result.file_path as string}`;
      })
  );

  promises.push(
    fetch(`${API}count=${channelName}`)
      .then(res => res.json())
      .then(data => {
        newChannel.subscribers = data.result;
      })
  );

  await Promise.all(promises);
  return newChannel;
}

function getChannels(): Promise<Array<Channel>> {
  const channelsNames: readonly string[] = [
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
    'SfottedDIEEI'
  ] as const;

  return Promise.all(channelsNames.map(channel => getData(channel)));
}

function compareSubscribers(a: Channel, b: Channel): number {
  if (a.subscribers && b.subscribers) {
    if (a.subscribers < b.subscribers) return 1;
    if (a.subscribers > b.subscribers) return -1;
  }
  return 0;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Channel> | void>
) {
  getChannels()
    .then(channels => {
      channels.sort(compareSubscribers);
      res.send(channels);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send();
    });
}
