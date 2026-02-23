import Course from "../models/cource.model.js";
import ApiError from "../utils/ApiError.js";
import {ApiResponse}    from "../utils/ApiResponse.js";
import {asyncHandler}   from "../utils/asyncHandler.js";
import uploadOnCloudinary  from "../config/cloudStorage.js";
import mongoose from "mongoose";


export const createCourse = asyncHandler(async (req, res) => {
  const { title,  category} = req.body;
  const createdId = req.user.id||req.userId;
    if (!title || !category) {
        throw new ApiError(400, "Please provide title and category");
    }

    const course = await Course.create({
        title,
        category,
        creator: createdId,
    });
return res
  .status(201)
  .json(new ApiResponse(201, course, "Course created successfully"));

});

export const getPublishedCourse = asyncHandler(async(req,res)=>{
    const courses = await Course.find({isPublished:true}).populate("creator","name");
    if(courses.length === 0||!courses){
        throw new ApiError(404,"No courses found");
    }
    return res.status(200).json(new ApiResponse("Courses fetched successfully", courses));
});

export const getCreatorCourses = asyncHandler(async(req,res)=>{
const userId = req.user?.id;
const courses = await Course.find({
  creator: new mongoose.Types.ObjectId(userId)
});
 
    if(courses.length === 0||!courses){
        throw new ApiError(404,"No courses found");
    }
    return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"))

});

// export  const editCourse = asyncHandler(async(req,res)=>{
//     const courseId = req.params.id;
//     const {title, subtitle, description, category, level, isPublished, price} = req.body;
//     let thumbnailUrl 
//     if(req.file){
//         thumbnailUrl = await uploadOnCloudinary(req.file.path); 

//     }
//     let course = await Course.findById(courseId);
//     if(!course){
//         throw new ApiError(404,"Course not found");
//     }
//     // let updatedCourse = await Course.findByIdAndUpdate(courseId,{
//     //     title:title||course.title,
//     //     subtitle:subtitle||course.subtitle,
//     //     description:description||course.description,
//     //     category:category||course.category,
//     //     level:level||course.level,
//     //     price:price||course.price,
//     //     thumbnailUrl:thumbnailUrl||course.thumbnailUrl,
//     // },{new:true});
//     let updatedCourse = {title,subtitle,description,category,level, isPublished, price,thumbnailUrl};
//     course = await Course.findByIdAndUpdate(courseId,updatedCourse,{new:true});
//     return res.status(200).json(new ApiResponse("Course updated successfully", course));
// });

export const editCourse = asyncHandler(async (req, res) => {
   const { id } = useParams();  // ✅ FIXED

    const { title, subtitle, description, category, level, isPublished, price } = req.body;

    let thumbnailUrl;

    if (req.file) {
        thumbnailUrl = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(id);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    const updatedCourseData = {
        title: title || course.title,
        subtitle: subtitle || course.subtitle,
        description: description || course.description,
        category: category || course.category,
        level: level || course.level,
        isPublished: typeof isPublished !== "undefined" ? isPublished : course.isPublished,
        price: price || course.price,
        thumbnailUrl: thumbnailUrl || course.thumbnailUrl,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updatedCourseData,
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});

export const getCourseById = asyncHandler(async(req,res)=>{
    const {courseId }= req.params;
    
    const course = await Course.findById(courseId).populate("creator","name");
    if(!course){
        throw new ApiError(404,"Course not found");
    }
    return res.status(200).json(new ApiResponse("Course fetched successfully", course));
});

export const removeCourse = asyncHandler(async(req,res)=>{
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }
    await course.remove();
    return res.status(200).json(new ApiResponse("Course removed successfully"));
});
