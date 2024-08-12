import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs/promises";
import { User } from "../db/user.js";
import Jimp from "jimp";
import HttpError from "./HttpError.js";

const filename = fileURLToPath(import.meta.url);
const urlString = dirname(filename);

const tempDir = path.join(urlString, "temp");
export const avatarsDir = path.join(urlString, "../", "public", "avatars");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});
export const upload = multer({
  storage: multerConfig,
});

export const getNewAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (req.file === undefined) {
      throw HttpError(400, "This field must not be empty");
    }

    const { path: altPath, originalname } = req.file;
    const newUserName = _id + originalname;

    const newPath = path.join(avatarsDir, newUserName);

    await fs.rename(altPath, newPath);

    const imageJimp = await Jimp.read(newPath);
    imageJimp.resize(250, 250);
    await imageJimp.writeAsync(newPath);

    const avatarURL = path.join("avatars", newUserName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(201).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
