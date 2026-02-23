import Course from "../models/cource.model.js";
import ApiError from "../utils/ApiError.js";
import {ApiResponse}    from "../utils/ApiResponse.js";
import {asyncHandler}   from "../utils/asyncHandler.js";
import uploadOnCloudinary  from "../config/cloudStorage.js";


export const createCourse = asyncHandler(async (req, res) => {
  const { title,  category} = req.body;
    if (!title || !category) {
        throw new ApiError(400, "Please provide title and category");
    }
    const course = new Course.create({
        title,
        category,
        creator: req.user._id||req.userId,
    });
    return res.status(201).json(new ApiResponse("Course created successfully", course));

});

export const getPublishedCourse = asyncHandler(async(req,res)=>{
    const courses = await Course.find({isPublished:true}).populate("creator","name");
    if(courses.length === 0||!courses){
        throw new ApiError(404,"No courses found");
    }
    return res.status(200).json(new ApiResponse("Courses fetched successfully", courses));
});

export const getCreatorCourses = asyncHandler(async(req,res)=>{
    const userId = req.user._id||req.userId;
    const courses = await Course.find({creator:userId}).populate("creator","name");
    if(courses.length === 0||!courses){
        throw new ApiError(404,"No courses found");
    }
    return res.status(200).json(new ApiResponse("Courses fetched successfully", courses));

});

export  const editCourse = asyncHandler(async(req,res)=>{
    const courseId = req.params.id;
    const {title, subtitle, description, category, level, isPublished, price} = req.body;
    let thumbnailUrl 
    if(req.file){
        thumbnailUrl = await uploadOnCloudinary(req.file.path); 

    }
    let course = await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found");
    }
    // let updatedCourse = await Course.findByIdAndUpdate(courseId,{
    //     title:title||course.title,
    //     subtitle:subtitle||course.subtitle,
    //     description:description||course.description,
    //     category:category||course.category,
    //     level:level||course.level,
    //     price:price||course.price,
    //     thumbnailUrl:thumbnailUrl||course.thumbnailUrl,
    // },{new:true});
    let updatedCourse = {title,subtitle,description,category,level, isPublished, price,thumbnailUrl};
    course = await Course.findByIdAndUpdate(courseId,updatedCourse,{new:true});
    return res.status(200).json(new ApiResponse("Course updated successfully", course));
});

export const getCourseById = asyncHandler(async(req,res)=>{
    const courseId = req.params.id;
    
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
