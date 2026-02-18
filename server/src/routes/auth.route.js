import express from "express";
import { createUser, loginUser, logoutUser, sentOTP,verifyOTP, resetPassword, googleAuth} from "../controllers/auth.controller.js";

const authRouter = express.Router();
import expressValidator, { body } from "express-validator";



authRouter.post("/register", 
    [body("name").isString(),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password"),
    body("role").isString()], createUser);

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
//Rest Password Routes
authRouter.post("/sent-otp", sentOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;