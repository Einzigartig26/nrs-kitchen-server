import bodyParser from "body-parser";
import express from "express";
import { addUser, login } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/add_user", bodyParser.json(), addUser);

userRouter.post("/login", bodyParser.json(), login);

export default userRouter;
