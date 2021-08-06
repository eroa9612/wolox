import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./bootstrap/config";

import User from "./user/adapter/user.route";

const app = express();
//middlewares

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", User);

app.set("port", config.PORT);

export default app;
