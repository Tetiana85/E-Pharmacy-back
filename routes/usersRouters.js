import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/usersControllers.js";
import { isValidToken } from "../helpers/isValidToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/logout", isValidToken, logoutUser);
usersRouter.get("/user-info", isValidToken, getUser);

export default usersRouter;
