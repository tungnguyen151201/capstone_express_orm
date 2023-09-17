import express from "express";
import { getUser, signIn, signUp } from "../Controllers/userController.js";
import { auth } from "../Middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/sign-up", signUp);
userRoutes.post("/sign-in", signIn);
userRoutes.get("/get-user", auth, getUser);

export default userRoutes;
