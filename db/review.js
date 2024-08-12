import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  name: String,
  testimonial: String,
});

export const Review = model("review", reviewSchema);
