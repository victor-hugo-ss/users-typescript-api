import express from "express";

import "dotenv/config";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js";
import { MongoClient } from "./database/mongo.js";

const main = async () => {
  const app = express();
  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
