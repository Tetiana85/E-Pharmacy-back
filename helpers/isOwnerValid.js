import HttpError from "./HttpError.js";

import dotenv from "dotenv";
import { Contact } from "../db/contact.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const isOwnerValid = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact.owner.equals(_id)) {
      throw HttpError(403, "You are not the owner of this contact");
    }

    next();
  } catch (error) {
    next(error);
  }
};
