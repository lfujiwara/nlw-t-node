import { Entity, IEntity } from "./entity";

export interface ITag extends IEntity {
  name: string;
}

export class Tag extends Entity {
  name!: string;
}
