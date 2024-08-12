import express from "express";
import morgan from "morgan";
import cors from "cors";
import storesRouter from "./routes/storesRouter.js";
import usersRouter from "./routes/usersRouters.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { Review } from "./db/review.js";

dotenv.config();
const app = express();

const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/user", usersRouter);
app.use(
  "/api/stores",
  (req, res, next) => {
    console.log("Accessed /api/stores");
    next();
  },
  storesRouter
);
app.use("/api/customer-reviews", async (req, res) => {
  try {
    const reviews = await Review.find();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
