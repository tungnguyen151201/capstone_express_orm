import express from "express";
import {
  getAllImages,
  getImageDetail,
  searchImages,
} from "../Controllers/imageController.js";

const imageRoutes = express.Router();

imageRoutes.get("/get-all-images", getAllImages);
imageRoutes.get("/search-images", searchImages);
imageRoutes.get("/get-image-detail/:id", getImageDetail);

export default imageRoutes;
