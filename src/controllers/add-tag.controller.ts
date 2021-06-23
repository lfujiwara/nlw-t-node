import { Context, Next } from "koa";
import { AddTagCommand, AddTagInput } from "../commands/add-tag";
import { Controller } from "./controller";

export class AddTagController implements Controller {
  constructor(private _cmd: AddTagCommand) {
    this.handle = this.handle.bind(this);
  }

  async handle(ctx: Context, next: Next) {
    const input = (ctx.request.body || {}) as AddTagInput;

    const tag = await this._cmd.execute(input);

    ctx.body = tag;
    ctx.status = 201;
    next();
  }
}
