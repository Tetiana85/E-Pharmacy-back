import express from "express";
import {
  getProductToId,
  getProductById,
  getProducts,
  getProductsCategory,
} from "../controllers/productsControllers.js";

const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.get("/categories", getProductsCategory);
productsRouter.get("/:id", getProductById);
productsRouter.post("/getByIds", getProductToId);

export default productsRouter;
