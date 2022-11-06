interface Base {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
}

export type Channel = Base & {
  subscribers: number;
};

export type Group = Base & {
  members: number;
  code: string;
  mz_code?: string;
};

export interface Bot {}

export type Entity = Channel | Group /* |Bots */;

export type EntityWithPosition = Entity & {
  position: number;
};
