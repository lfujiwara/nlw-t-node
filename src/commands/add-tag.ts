import Joi from "joi";
import { ITagsRepository } from "../data/repositories/tags.repository";
import { Tag } from "../models/tag";
import { Command, CommandError, CommandErrorCodes } from "./command";

export type AddTagInput = {
  name: string;
};
export type AddTagOutput = {
  name: string;
  id: string;
};

export const AddTagInputSchema = Joi.object<AddTagInput>({
  name: Joi.string().min(1).max(128),
});

export class AddTagCommand implements Command<AddTagInput, AddTagOutput> {
  constructor(private repository: ITagsRepository) {}

  async execute(input: AddTagInput): Promise<AddTagOutput> {
    Joi.assert(input || {}, AddTagInputSchema);

    const { name } = input;

    if (await this.repository.existsByName(name))
      throw new CommandError(CommandErrorCodes.TAG_NAME_ALREADY_REGISTERED);

    const tag = Tag.create();
    tag.name = name;

    tag.assert();

    await this.repository.create(tag);

    return { id: tag.id, name: tag.name };
  }
}
