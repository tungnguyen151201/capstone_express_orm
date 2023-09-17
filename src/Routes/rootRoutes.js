import express from "express";
import userRoutes from "./userRoutes.js";
import imageRoutes from "./imageRoutes.js";
import commentRoutes from "./commentRoutes.js";
import saveImageRoutes from "./saveImageRoutes.js";
import { auth } from "../Middlewares/authMiddleware.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/image", imageRoutes);
rootRoutes.use("/comment", commentRoutes);
rootRoutes.use("/save-image", auth, saveImageRoutes);

export default rootRoutes;
