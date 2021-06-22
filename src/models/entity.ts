import { v4 } from "uuid";

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Entity implements IEntity {
  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static init(entity: Entity) {
    const date = new Date();

    entity.id = v4();
    entity.createdAt = entity.updatedAt = date;
  }
}
