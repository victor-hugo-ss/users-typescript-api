import validator from "validator";

import type { User } from "../../models/user.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  CreateUserParams,
  IcreateUserController,
  IcreateUserRepository,
} from "./protocols.js";

export class CreateUserController implements IcreateUserController {
  constructor(private readonly createUserRepository: IcreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required!`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!,
      );
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Somethings went wron!",
      };
    }
  }
}
