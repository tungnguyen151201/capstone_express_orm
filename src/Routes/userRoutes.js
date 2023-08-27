import express from "express";
import { getUser, signIn, signUp } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/get-user", getUser);
userRoutes.post("/sign-up", signUp);
userRoutes.post("/sign-in", signIn);

export default userRoutes;
