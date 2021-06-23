import Router from "@koa/router";
import { Connection } from "typeorm";
import { AddTagCommand } from "../commands/add-tag";
import { AddTagController } from "../controllers/add-tag.controller";
import { MainErrorHandler } from "../controllers/errors/main.handler";
import { TagsRepository } from "../data/repositories/tags.repository";

export const makeTagsRouter = (conn: Connection) => {
  const router = new Router({ prefix: "/tags" });
  router.use(MainErrorHandler);

  // Repositories
  const tagsRepository = new TagsRepository(conn);

  // Commands
  const addTagCommand = new AddTagCommand(tagsRepository);

  // Controllers
  const addTagController = new AddTagController(addTagCommand);

  router.post("/", addTagController.handle);

  return router;
};
