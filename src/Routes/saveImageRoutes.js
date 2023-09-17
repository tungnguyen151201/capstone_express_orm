import express from "express";
import {
  checkSaveImage,
  getSaveImages,
  handleSaveImage,
} from "../Controllers/saveImageController.js";

const saveImageRoutes = express.Router();

saveImageRoutes.post("/", handleSaveImage);
saveImageRoutes.get("/check-save-image/:imageId", checkSaveImage);
saveImageRoutes.get("/get-save-images", getSaveImages);

export default saveImageRoutes;
