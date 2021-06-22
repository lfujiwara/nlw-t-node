import { Entity, ManyToOne } from "typeorm";
import { ICompliment } from "../../models/compliment";
import { DbEntity } from "./db-entity";
import { DbTag } from "./db-tag";
import { DbUser } from "./db-user";

@Entity()
export class DbCompliment extends DbEntity implements ICompliment {
  @ManyToOne(() => DbUser)
  sender!: DbUser;

  @ManyToOne(() => DbUser)
  receiver!: DbUser;

  @ManyToOne(() => DbTag)
  tag!: DbTag;
}
