import dotenv from "dotenv";
dotenv.config();
import { User } from "../db/user.js";
import { createUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import RegisterHttpError from "../helpers/RegisterHttpError.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const createUser = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3d" });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user.toObject();
    delete user.password;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
