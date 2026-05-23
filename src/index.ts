import express from "express";

import "dotenv/config";

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
