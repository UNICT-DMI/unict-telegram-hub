export interface Channel {
  title: string;
  link: string;
  description: string;
  pictureURL: string;
  subscribers: number;
}

export interface Groups {}

export interface Bots {}

export type Entity = Channel /* | Groups | Bots */;

export type EntityWithPosition = Entity & {
  position: number
};