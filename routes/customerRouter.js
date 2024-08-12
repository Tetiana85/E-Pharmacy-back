import express from "express";

const customerRouter = express.Router();
customerRouter.get("/");
customerRouter.get("/:id");
export default customerRouter;
