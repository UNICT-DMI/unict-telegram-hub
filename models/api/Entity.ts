export interface Channel {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

export interface Group {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  members: number;
  code: string;
  mz_code?: string;
}

export interface Bot {}

export type Entity = Channel | Group /* |Bots */;

export type EntityWithPosition = Entity & {
  position: number;
};
