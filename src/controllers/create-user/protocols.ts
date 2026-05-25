import type { User } from "../../models/user.js";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IcreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
