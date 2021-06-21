import Router from "@koa/router";
import Koa from "koa";

export const makeServer = ({
  healthRouter,
}: {
  healthRouter: Router<any, any>;
}) => {
  const server = new Koa();

  server.use(healthRouter.routes()).use(healthRouter.allowedMethods());

  return server;
};
