import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();
import expressValidator, { body } from "express-validator";

//>authRouter.use(expressValidator());

authRouter.post("/register", 
    [body("name").isString(),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password"),
    body("role").isString()], createUser);

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;