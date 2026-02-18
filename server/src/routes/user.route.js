import express from 'express';
import { getUser, updateProfile } from '../controllers/user.controller.js';
import isAuth  from '../middleware/isAuth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const userRouter= express.Router();

userRouter.get('/current',isAuth,getUser);
userRouter.put('/update',isAuth,upload.single('photoUrl'),updateProfile);



export default userRouter;