import { ValidationError } from "joi";
import { Context, Next } from "koa";
import { CommandError } from "../../commands/command";
import { CommandErrorHandler } from "./command-error.handler";
import { ValidationErrorHandler } from "./validation-error.handler";

export const MainErrorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof CommandError) return CommandErrorHandler(err, ctx);
    if (err instanceof ValidationError) return ValidationErrorHandler(err, ctx);
  }
};
