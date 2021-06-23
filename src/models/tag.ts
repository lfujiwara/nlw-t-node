import Joi from "joi";
import { Entity, IEntity } from "./entity";

export interface ITag extends IEntity {
  name: string;
}

export const TagValidationSchema = Joi.object<ITag>({
  name: Joi.string().min(1).max(128).required(),
}).unknown(true);

export class Tag extends Entity {
  name!: string;

  static create() {
    const tag = new Tag();
    super.init(tag);
    return tag;
  }

  assert() {
    Joi.assert(this, TagValidationSchema);
  }
}
