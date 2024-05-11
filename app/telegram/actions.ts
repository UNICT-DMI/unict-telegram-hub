'use server';

import { Entity } from '@/models/api/Entity';

export async function loadCards(chosenEntityType: string): Promise<ReadonlyArray<Entity>> {
  // retrievedItems = await (await fetch('')).json();

  const r = (Math.random() * 10000).toFixed(0);

  return new Array<Entity>(50).fill({
    title: `${chosenEntityType} ${r}`,
    description: `Description: ${r}`,
    link: 'http://localhost:3000/telegram',
    subscribers: Math.random() * 1000
  });
}
