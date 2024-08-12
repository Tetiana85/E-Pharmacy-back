import express from "express";
import {
  getAllStores,
  getStoresNearest,
} from "../controllers/storesControllers.js";

const storesRouter = express.Router();

storesRouter.get("/", getAllStores);
storesRouter.get("/nearest", getStoresNearest);

export default storesRouter;
