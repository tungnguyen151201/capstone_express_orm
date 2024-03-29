import express from 'express';

import { deleteImage, getAllImages, getImageDetail, getImagesByUserId, searchImages, uploadImage } from '../Controllers/imageController.js';
import { auth } from '../Middlewares/authMiddleware.js';
import uploadSingle from '../Middlewares/uploadMiddleware.js';

const imageRoutes = express.Router();

imageRoutes.get('/get-all-images', getAllImages);
imageRoutes.get('/search-images', searchImages);
imageRoutes.get('/get-image-detail/:id', getImageDetail);
imageRoutes.get('/get-images-by-user-id', auth, getImagesByUserId);
imageRoutes.delete('/:id', deleteImage);
imageRoutes.post('/upload', auth, uploadSingle, uploadImage);

export default imageRoutes;
