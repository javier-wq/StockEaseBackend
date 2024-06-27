import "dotenv/config";
import ServerlessHttp from "serverless-http";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { router } from "../src/routes";
import db from "../src/config/mongo";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use(router);

db().then(() => console.log("Connection established successfully"));

exports.handler = ServerlessHttp(app);