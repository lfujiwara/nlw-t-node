import Joi from "joi";
import { UsersRepository } from "../data/repositories/users.repository";
import { User } from "../models/user";
import { Command, CommandError, CommandErrorCodes } from "./command";

export type AddUserInput = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};
export type AddUserOutput = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export const AddUserInputSchema = Joi.object<AddUserInput>({
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(128).required(),
  password: Joi.string().min(8).max(128).required(),
  isAdmin: Joi.boolean().optional(),
});

export class AddUserCommand implements Command<AddUserInput, AddUserOutput> {
  constructor(private repository: UsersRepository) {}

  async execute(input: AddUserInput): Promise<AddUserOutput> {
    Joi.assert(input || {}, AddUserInputSchema);

    const { name, email, password, isAdmin } = input;

    if (await this.repository.existsByEmail(email))
      throw new CommandError(CommandErrorCodes.EMAIL_ALREADY_REGISTERED);

    const user = User.create();

    user.name = name;
    user.email = email;
    user.isAdmin = !!isAdmin;
    await user.setPassword(password);

    user.assert();

    await this.repository.create(user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  }
}
