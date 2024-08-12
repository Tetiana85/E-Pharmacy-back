import { NearestStore } from "../db/nearestStore.js";
import { Store } from "../db/store.js";
import HttpError from "../helpers/HttpError.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().limit(9);
    res.status(200).json(stores);
  } catch (error) {
    res.json(HttpError(404));
  }
};

export const getStoresNearest = async (req, res, next) => {
  try {
    const stores = await NearestStore.find();
    res.json(stores);
  } catch (error) {
    next(error);
  }
};
