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

export enum GroupsYear {
  AllYears,
  First,
  Second,
  Third
}

export type GroupsDictionary = Record<
  GroupsYear.AllYears | GroupsYear.First | GroupsYear.Second | GroupsYear.Third,
  Record<string, GroupsDictionaryValue>
>;
