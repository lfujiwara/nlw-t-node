import Router from "@koa/router";

export const makeHealthRouter = () => {
  const router = new Router({ prefix: "/health" });

  router.get("/", (ctx, next) => {
    ctx.body = { message: "System is running" };
    ctx.status = 200;
    next();
  });

  return router;
};
