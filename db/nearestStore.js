import { Schema, model } from "mongoose";

const storeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const NearestStore = model("nearest_pharmacie", storeSchema);
