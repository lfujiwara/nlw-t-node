import { Column, Entity } from "typeorm";
import { ITag, Tag } from "../../models/tag";
import { DbEntity } from "./db-entity";

@Entity()
export class DbTag extends DbEntity implements ITag {
  @Column()
  name!: string;

  deserialize(): Tag {
    const tag = new Tag();
    tag.id = this.id;
    tag.name = this.name;
    tag.createdAt = this.createdAt;
    tag.updatedAt = this.updatedAt;

    return tag;
  }
}
