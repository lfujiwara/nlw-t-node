import { ValidationError } from "joi";
import { Context, Next } from "koa";
import { AddUserCommand, AddUserInput } from "../commands/add-user";
import { CommandError, CommandErrorCodes as Codes } from "../commands/command";
import { Controller } from "./controller";
import { CommandErrorHandler } from "./errors/command-error.handler";
import { ValidationErrorHandler } from "./errors/validation-error.handler";

export class AddUserController implements Controller {
  constructor(private _cmd: AddUserCommand) {
    this.handle = this.handle.bind(this);
  }

  async handle(ctx: Context, next: Next) {
    try {
      const input = (ctx.request.body || {}) as AddUserInput;
      input.isAdmin = false;

      const user = await this._cmd.execute(input);

      ctx.body = user;
      ctx.status = 201;
    } catch (err) {
      if (err instanceof CommandError)
        return CommandErrorHandler(err, ctx, next);
      if (err instanceof ValidationError)
        return ValidationErrorHandler(err, ctx, next);
    }

    next();
  }
}
