import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getToken } from "../config/token.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import bcrypt from "bcryptjs";


export const createUser = asyncHandler(async (req ,res)=> {
          const{name, email,password,role}= req.body;
if (!name || !email || !password) {
    throw new ApiError({
        statusCode: 400,
        message: "Name, email, and password are required"
    });
}

          const existingUser = await User.findOne({email});
          if(existingUser){
           throw new ApiError(409, [], "User with given email already exists");

          }

         let hashPassword = await bcrypt.hash(password,10);

      
          const user = await User.create({
            name,
            email,
            password:hashPassword,
            role,

          });

          let token = await getToken(user); 
         res.cookie("token", token, {
    httpOnly: true,
   secure: process.env.NODE_ENV === "production",
    maxAge: 2000*60*60*24, // 24 hours
    sameSite: "strict"
});
  
return res.status(201).json(
     new ApiResponse(201, 
        user,
    "User created successfully")
);
});

//Login User
export const loginUser = asyncHandler(async(req ,res)=>{
    const {email,password}=req.body;
    
  
    const user = await User.findOne({email});


   if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}
    const isPasswordMatch = await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
     return  res.status(401).json({
        success: false,
        message: "Invalid Credentials"
     });
    }

    
    const token = await getToken(user);
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        maxAge:2000*60*60*24,//3600 seconds
        sameSite:"strict"
    });
    return res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));
});


//Logout User
export const logoutUser = asyncHandler(async(req ,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        secure:true,
        maxAge:1000*60*60*24,//24 hours
        sameSite:"strict"
    });
// await req.session.destroy();
// req.session=null;
// req.logout();
// res.clearCookie("token");

    return res.status(200).json(
        new ApiResponse(200, 
            null,
        "User logged out successfully")
    );
});