import express from "express";
import { signIn, signUp } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/sign-up", signUp);
userRoutes.post("/sign-in", signIn);

export default userRoutes;
