import { Column, Entity } from "typeorm";
import { ITag } from "../../models/tag";
import { DbEntity } from "./db-entity";

@Entity()
export class DbTag extends DbEntity implements ITag {
  @Column()
  name!: string;
}
