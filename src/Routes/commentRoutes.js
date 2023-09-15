import express from "express";
import { createComment } from "../Controllers/commentController.js";

const commentRoutes = express.Router();

commentRoutes.post("/create-comment", createComment);

export default commentRoutes;
