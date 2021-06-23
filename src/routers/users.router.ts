import Router from "@koa/router";
import { Connection } from "typeorm";
import { AddUserCommand } from "../commands/add-user";
import { AddUserController } from "../controllers/add-user.controller";
import { MainErrorHandler } from "../controllers/errors/main.handler";
import { UsersRepository } from "../data/repositories/users.repository";

export const makeUsersRouter = (conn: Connection) => {
  const router = new Router({ prefix: "/users" });
  router.use(MainErrorHandler);

  // Repositories
  const usersRepository = new UsersRepository(conn);

  // Commands
  const addUserCommand = new AddUserCommand(usersRepository);

  // Controllers
  const addUserController = new AddUserController(addUserCommand);

  router.post("/", addUserController.handle);

  return router;
};
