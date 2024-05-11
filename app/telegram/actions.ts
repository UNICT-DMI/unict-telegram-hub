'use server';

import { Entity } from '@/app/telegram/models';

export async function loadCards(url: URL): Promise<ReadonlyArray<Entity>> {
  console.log(url);

  return await (await fetch(url)).json();

  /* const r = (Math.random() * 10000).toFixed(0);

  return new Array<Entity>(50).fill({
    title: `${chosenEntityType} ${r}`,
    description: `Description: ${r}`,
    link: 'http://localhost:3000/telegram',
    subscribers: Math.random() * 1000
  }); */
}
