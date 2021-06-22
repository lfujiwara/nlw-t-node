import request from "supertest";
import { Server } from "http";
import faker from "faker";
import { makeServer } from "../../server";
import { makeUsersRouter } from "../../routers/users.router";
import { makeConnection } from "../../data/makeConnection";
import { Connection } from "typeorm";
import { DbUser } from "../../data/entities/db-user";

describe("Add user", () => {
  let server: Server;
  let api: request.SuperTest<request.Test>;
  let conn: Connection;

  const makeUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = faker.name.findName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(12);
    return { name, email, password };
  };

  beforeAll(async () => {
    const koa = makeServer();
    conn = await makeConnection({
      entities: [DbUser],
    });
    const usersRouter = makeUsersRouter(conn);

    koa.use(usersRouter.routes()).use(usersRouter.allowedMethods());

    server = koa.listen();
    api = request(server);
  });

  beforeEach(async () => {
    if (conn) {
      const repository = conn.getRepository(DbUser);
      await repository.delete({});
    }
  });

  afterAll(async () => {
    const repository = conn.getRepository(DbUser);
    await repository.delete({});
    server.close();
  });

  test("Returns OK on valid user", async () => {
    const response = await api.post("/users").send(makeUser());
    expect(response.status).toEqual(201);
  });

  test("Fails on duplicate email", async () => {
    const user = makeUser();

    const response = await api.post("/users").send(user);
    expect(response.status).toEqual(201);

    const response2 = await api
      .post("/users")
      .send({ ...makeUser(), email: user.email });
    expect(response2.status).toEqual(409);
  });

  test("Fails on short password", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = faker.name.findName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password(6);

    const response = await api.post("/users").send({
      name,
      email,
      password,
    });
    expect(response.status).toEqual(400);
  });
});
