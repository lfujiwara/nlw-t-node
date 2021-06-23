import { Connection } from "typeorm";
import faker from "faker";
import request from "supertest";
import { AddTagCommand } from "../../commands/add-tag";
import { makeConnection } from "../../data/makeConnection";
import { DbTag } from "../../data/entities/db-tag";
import { TagsRepository } from "../../data/repositories/tags.repository";
import { makeServer } from "../../server";
import { makeTagsRouter } from "../../routers/tags.router";
import { Server } from "http";

describe("Add tag", () => {
  let server: Server;
  let api: request.SuperTest<request.Test>;
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
    const koa = makeServer();
    conn = await makeConnection({ entities: [DbTag], synchronize: true });
    cmd = new AddTagCommand(new TagsRepository(conn));

    const usersRouter = makeTagsRouter(conn);

    koa.use(usersRouter.routes()).use(usersRouter.allowedMethods());
    server = koa.listen();

    api = request(server);
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await cleanup();
    await conn.close();
    await server.close();
  });

  test("Add tag", async () => {
    const tag = makeTag();

    const response = await api.post("/tags").send(tag);

    expect(response.status).toStrictEqual(201);
    expect(tag.name).toStrictEqual(response.body?.name);
  });

  test("Prevent duplicate tag", async () => {
    const tag = makeTag();
    const errorTag = { ...makeTag(), name: tag.name };

    await api.post("/tags").send(tag);
    const response = await api.post("/tags").send(errorTag);

    expect(response.status).toStrictEqual(409);
  });
});
