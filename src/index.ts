import express from "express";

import "dotenv/config";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users.js";
import { CreateUserController } from "./controllers/create-user/create-user.js";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user.js";
import { UpdateUserController } from "./controllers/update-user/update-user.js";

const main = async () => {
  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository,
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
