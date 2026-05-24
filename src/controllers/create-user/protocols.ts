import type { User } from "../../models/user.js";
import type { HttpResponse, HttpRequest } from "../protocols.js";

export interface IcreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IcreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
