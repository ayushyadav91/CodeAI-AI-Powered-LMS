import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

//cors middleware used to allow cross origin requests
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));


//middleware
app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}));
app.use(express.static("public"));

//cookie parser middleware
app.use(cookieParser());

//routes
// * Health check
app.get("/", (req, res) => {
    res.send("Server is running");
});

//auth routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);



export default app;