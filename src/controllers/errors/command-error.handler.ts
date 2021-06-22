import { Context, Next } from "koa";
import { CommandError } from "../../commands/command";
import { CommandErrorCodes as Codes } from "../../commands/command";

export const CommandErrorHandler = (
  err: CommandError,
  ctx: Context,
  next: Next
) => {
  const code = err.code;

  switch (code) {
    case Codes.EMAIL_ALREADY_REGISTERED:
      ctx.status = 409;
      break;
    default:
      ctx.status = 500;
  }

  next();
};
