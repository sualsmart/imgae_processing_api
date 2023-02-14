import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./api";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to the API");
});
app.use("/api", routes);

export default app;
