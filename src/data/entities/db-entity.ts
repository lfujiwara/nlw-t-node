import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IEntity } from "../../models/entity";

@Entity()
export class DbEntity implements IEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;
  @CreateDateColumn()
  public createdAt!: Date;
  @UpdateDateColumn()
  public updatedAt!: Date;
}
