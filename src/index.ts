import express from "express";
import { config } from "dotenv";
config();
import connnectDatabase from "./utils/database.js";

const app = express();

app.use(express.json());
connnectDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!`);
});
