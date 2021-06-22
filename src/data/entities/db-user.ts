import { Column, Entity } from "typeorm";
import { IUser } from "../../models/user";
import { DbEntity } from "./db-entity";

@Entity()
export class DbUser extends DbEntity implements IUser {
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdmin!: boolean;
}
