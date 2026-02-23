import express from "express";
import { createCourse, getPublishedCourse, getCreatorCourses, editCourse, getCourseById, removeCourse } from "../controllers/course.Controller.js";
import  isAuth  from "../middleware/isAuth.middleware.js";
import  upload  from "../middleware/multer.middleware.js";


const courseRouter = express.Router();

courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/published", getPublishedCourse);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);
courseRouter.get("/getcourse/:id", isAuth, getCourseById);
courseRouter.delete("/:id", isAuth, removeCourse);

export default courseRouter;

