import { Entity, IEntity } from "./entity";
import { ITag, Tag } from "./tag";
import { IUser, User } from "./user";

export interface ICompliment extends IEntity {
  sender: IUser;
  receiver: IUser;
  tag: ITag;
}

export class Compliment extends Entity implements ICompliment {
  sender!: User;
  receiver!: User;
  tag!: Tag;
}
