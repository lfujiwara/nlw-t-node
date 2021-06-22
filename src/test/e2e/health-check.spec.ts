import request from "supertest";
import { Server } from "http";
import { makeHealthRouter } from "../../routers/health.router";
import { makeServer } from "../../server";

describe("Health check", () => {
  let server: Server;
  let api: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const koa = makeServer();
    const healthRouter = makeHealthRouter();

    koa.use(healthRouter.routes()).use(healthRouter.allowedMethods());

    server = koa.listen();
    api = request(server);
  });

  afterAll(() => {
    server.close();
  });

  test("Returns OK on health check route", async () => {
    const response = await api.get("/health");

    expect(response.statusCode).toStrictEqual(200);
  });
});
