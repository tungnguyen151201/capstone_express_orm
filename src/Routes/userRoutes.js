import express from "express";
import { getUser, signUp } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/get-user", getUser);
userRoutes.post("/sign-up", signUp);

export default userRoutes;
