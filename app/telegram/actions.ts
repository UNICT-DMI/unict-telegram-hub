'use server';

import { Entity } from '@/app/telegram/models';

export async function loadCards(url: URL): Promise<ReadonlyArray<Entity>> {
  return await (await fetch(url)).json();
}
