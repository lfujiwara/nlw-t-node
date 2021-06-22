import { makeConnection } from "./data/makeConnection";
import { makeHealthRouter } from "./routers/health.router";
import { makeUsersRouter } from "./routers/users.router";
import { makeServer } from "./server";

const main = async () => {
  const conn = await makeConnection();

  const healthRouter = makeHealthRouter();
  const usersRouter = makeUsersRouter(conn);
  const server = makeServer();

  server.use(healthRouter.routes()).use(healthRouter.allowedMethods());
  server.use(usersRouter.routes()).use(usersRouter.allowedMethods());

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
};

main();
