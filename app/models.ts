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

export interface GroupEntry {
  title: string;
  suffix: string;
  teamsCodes: ReadonlyArray<string>;
}

// Each sub-array corresponds to which year of the study course the groups belong to
export type Groups = ReadonlyArray<ReadonlyArray<GroupEntry>>;
