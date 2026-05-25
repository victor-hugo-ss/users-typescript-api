import type { User } from "../../models/user.js";

export interface IDeleteUserRepository {
  deteteUser(id: string): Promise<User>;
}
