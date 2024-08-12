import { Schema, model } from "mongoose";

const productSchema = new Schema({
  photo: { type: String, required: true },
  name: { type: String, required: true },
  suppliers: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

export const Products = model("product", productSchema);
