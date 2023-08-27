import express from "express";
import { getAllImages, searchImages } from "../Controllers/imageController.js";

const imageRoutes = express.Router();

imageRoutes.get("/get-all-images", getAllImages);
imageRoutes.get("/search-images", searchImages);

export default imageRoutes;
