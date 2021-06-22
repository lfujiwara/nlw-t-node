import Koa from "koa";
import koaBody from "koa-body";

export const makeServer = () => {
  const server = new Koa();
  server.use(koaBody());

  return server;
};
