import { ValidationError } from "joi";
import { Context, Next } from "koa";

export const ValidationErrorHandler = (
  err: ValidationError,
  ctx: Context,
  next: Next
) => {
  ctx.status = 400;
  ctx.body = err.details;
  next();
};
