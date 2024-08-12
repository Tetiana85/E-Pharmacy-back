import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../db/user.js";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export const isValidToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const findUser = await User.findById(id);
    if (!findUser || !findUser.token || findUser.token !== token) {
      next(HttpError(401));
    }
    req.user = findUser;
    next();
  } catch {
    next(new HttpError(401));
  }
};
