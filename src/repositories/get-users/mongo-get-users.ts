import type { IGetUsersRepository } from "../../controllers/get-users/protocols.js";
import type { User } from "../../models/user.js";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstname: "Victor",
        lastname: "Silva",
        email: "Victorabreu0511@gmail.com",
        password: "12345678",
      },
    ];
  }
}
