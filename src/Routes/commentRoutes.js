import express from "express";
import {
  createComment,
  getCommentsByImageId,
} from "../Controllers/commentController.js";
import { auth } from "../Middlewares/authMiddleware.js";

const commentRoutes = express.Router();

commentRoutes.post("/create-comment", auth, createComment);
commentRoutes.get("/get-comments-by-image-id/:imageId", getCommentsByImageId);

export default commentRoutes;
