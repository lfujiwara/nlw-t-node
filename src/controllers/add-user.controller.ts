import { Context, Next } from "koa";
import { AddUserCommand, AddUserInput } from "../commands/add-user";
import { Controller } from "./controller";

export class AddUserController implements Controller {
  constructor(private _cmd: AddUserCommand) {
    this.handle = this.handle.bind(this);
  }

  async handle(ctx: Context, next: Next) {
    const input = (ctx.request.body || {}) as AddUserInput;
    input.isAdmin = false;

    const user = await this._cmd.execute(input);

    ctx.body = user;
    ctx.status = 201;
    next();
  }
}
