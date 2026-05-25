import type { User } from "../../models/user.js";
import type { HttpResponse, IController } from "../protocols.js";
import type { IGetUsersRepository } from "./protocols.js";
import { ok, serverError } from "../helpers.js";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
