import validator from "validator";

import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse, IController } from "../protocols.js";
import type { CreateUserParams, IcreateUserRepository } from "./protocols.js";
import { badRequest, created, serverError } from "../helpers.js";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: IcreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required!`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!,
      );
      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
