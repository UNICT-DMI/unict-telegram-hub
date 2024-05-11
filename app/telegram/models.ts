export const entities = ['channels', 'groups', 'bots'] as const;

export interface Base {
  link: string;
  pictureURL?: string;
  title: string;
  description?: string;
}

export type Channel = Base & {
  subscribers: number;
};

export type Group = Base & {
  members: number;
  code: string;
  mz_code?: string;
};

export type Bot = Base;

export type Entity = Channel | Group | Bot;

export type EntityWithPosition = Entity & {
  position: number;
};

export interface GroupsDictionaryValue {
  suffix: string;
  teamsCodes: ReadonlyArray<string>;
}

export type GroupsDictionary = Record<1 | 2 | 3, Record<string, GroupsDictionaryValue>>;
