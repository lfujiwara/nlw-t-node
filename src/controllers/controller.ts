import { Context, Next } from "koa";

export interface Controller {
  handle: (ctx: Context, next: Next) => any;
}
