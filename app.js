import express from "express";
import morgan from "morgan";
import cors from "cors";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import {config} from './config.js';
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

console.log(process.env.JWT_SECRET);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// 라우터
app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

sequelize.sync().then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
})
