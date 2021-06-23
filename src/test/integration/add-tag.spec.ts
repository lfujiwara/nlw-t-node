import { Connection } from "typeorm";
import faker from "faker";
import { AddTagCommand } from "../../commands/add-tag";
import { makeConnection } from "../../data/makeConnection";
import { DbTag } from "../../data/entities/db-tag";
import { TagsRepository } from "../../data/repositories/tags.repository";

describe("Add tag", () => {
  let conn: Connection;
  let cmd: AddTagCommand;

  const makeTag = () => ({ name: faker.random.word() });
  const cleanup = async () => {
    if (conn) {
      const repository = conn.getRepository(DbTag);
      await repository.delete({});
    }
  };

  beforeAll(async () => {
    conn = await makeConnection({ entities: [DbTag], synchronize: true });
    cmd = new AddTagCommand(new TagsRepository(conn));
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await cleanup();
    await conn.close();
  });
  test("Add tag", async () => {
    const response = await cmd.execute(makeTag());
    expect(response).toBeTruthy();
  });

  test("Prevent duplicate tag", async () => {
    const tag = makeTag();
    const errorTag = { ...makeTag(), name: tag.name };

    await cmd.execute(tag);

    await expect(() => cmd.execute(errorTag)).rejects;
  });
});
