import express from "express";
import userRoutes from "./userRoutes.js";
import imageRoutes from "./imageRoutes.js";
import commentRoutes from "./commentRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/image", imageRoutes);
rootRoutes.use("/comment", commentRoutes);

export default rootRoutes;
