import Joi from "joi";
import { hash, compare } from "bcryptjs";
import { Entity, IEntity } from "./entity";

export interface IUser extends IEntity {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const UserValidationSchema = Joi.object<IUser>({
  id: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(1).max(128),
}).unknown(true);

export class User extends Entity implements IUser {
  name!: string;
  email!: string;
  isAdmin!: boolean;

  private _password!: string;

  public get password() {
    return this._password;
  }

  async setPassword(password: string) {
    this._password = await hash(password, 10);
  }

  verifyPassword(value: string) {
    return compare(value, this.password);
  }

  static create() {
    const user = new User();
    super.init(user);
    return user;
  }

  assert() {
    Joi.assert(this, UserValidationSchema);
  }
}
