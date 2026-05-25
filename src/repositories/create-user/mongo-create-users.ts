import type {
  CreateUserParams,
  IcreateUserRepository,
} from "../../controllers/create-user/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.js";
import type { MongoUser } from "../mongo-protocols.js";

export class MongoCreateUserRepository implements IcreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created!");
    }

    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
