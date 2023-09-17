import express from "express";
import {
  checkSaveImage,
  handleSaveImage,
} from "../Controllers/saveImageController.js";

const saveImageRoutes = express.Router();

saveImageRoutes.get("/check-save-image/:imageId", checkSaveImage);
saveImageRoutes.post("/", handleSaveImage);

export default saveImageRoutes;
