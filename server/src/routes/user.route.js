import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import isAuth  from '../middleware/isAuth.middleware.js';

const userRouter= express.Router();

userRouter.post('/',isAuth,getUser);



export default userRouter;