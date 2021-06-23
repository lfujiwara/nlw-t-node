import { Connection, Repository } from "typeorm";
import { Tag } from "../../models/tag";
import { DbTag } from "../entities/db-tag";

export interface ITagsRepository {
  getByName(name: string): Promise<Tag | undefined>;
  existsByName(name: string): Promise<boolean>;
  create(tag: Tag): Promise<void>;
}

export class TagsRepository implements ITagsRepository {
  private repository: Repository<DbTag>;

  constructor(conn: Connection) {
    this.repository = conn.getRepository(DbTag);
  }

  async create(tag: Tag): Promise<void> {
    const dbTag = this.repository.create(tag);
    await this.repository.save(dbTag);
  }

  async getByName(name: string): Promise<Tag | undefined> {
    const tag = await this.repository.findOne(undefined, { where: { name } });
    return tag?.deserialize();
  }

  async existsByName(name: string): Promise<boolean> {
    return !!(await this.repository.findOne(undefined, {
      where: { name },
      select: ["id", "name"],
    }));
  }
}
