import { Connection, Repository } from "typeorm";
import { IUser } from "../../models/user";
import { DbUser } from "../entities/db-user";

export class UsersRepository {
  private repository: Repository<DbUser>;

  constructor(conn: Connection) {
    this.repository = conn.getRepository(DbUser);
  }

  getById(id: number) {
    return this.repository.findOne(id);
  }

  getByEmail(email: string) {
    return this.repository.findOne(undefined, { where: { email } });
  }

  async existsById(id: number) {
    return !!(await this.repository.findOne(id, { select: ["id"] }));
  }

  async existsByEmail(email: string) {
    return !!(await this.repository.findOne(undefined, {
      select: ["id"],
      where: { email },
    }));
  }

  async create(user: IUser) {
    const dbUser = this.repository.create(user);
    await this.repository.save(dbUser);
  }
}
