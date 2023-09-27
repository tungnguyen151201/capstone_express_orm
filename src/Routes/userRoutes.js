import express from 'express';
import { editProfile, getUser, signIn, signUp } from '../Controllers/userController.js';
import { auth } from '../Middlewares/authMiddleware.js';
import uploadSingle from '../Middlewares/uploadMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/sign-up', signUp);
userRoutes.post('/sign-in', signIn);
userRoutes.get('/get-user', auth, getUser);
userRoutes.put('/edit-profile', auth, uploadSingle, editProfile);

export default userRoutes;
