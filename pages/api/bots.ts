import { NextApiRequest, NextApiResponse } from 'next';
import { Bot } from '../../models/api/Entity';

const botsAPI: string = `${process.env.API}/mid.php?path=GRUPPI/BOT`;

async function getNames(): Promise<Array<string>> {
  return fetch(`${botsAPI}.json`)
    .then(res => res.json())
    .then((data: { names: Array<string> }) => {
      return data.names;
    });
}

async function getData(botName: string): Promise<Bot> {
  const newBot: Bot = {} as Bot;

  await fetch(`${botsAPI}/${botName}.json`)
    .then(res => res.json())
    .then(data => {
      newBot.title = data.group_name;
      newBot.link = data.link.substring(1, data.link.length - 1);
      newBot.description = data.description;
      newBot.pictureURL = data.image_link.substring(1, data.image_link.length - 1);
    });

  return newBot;
}

function compareTitles(a: Bot, b: Bot): number {
  return a.title.localeCompare(b.title);
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Array<Bot> | void>) {
  getNames()
    .then(botsNames => Promise.all(botsNames.map(botName => getData(botName))))
    .then(bots => {
      bots.sort(compareTitles);
      res.send(bots);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send([]);
    });
}
