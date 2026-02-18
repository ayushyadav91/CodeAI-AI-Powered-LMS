import  User  from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import  uploadOnCloudinary  from '../config/cloudStorage.js';

export const getUser = asyncHandler(async (req, res) => {
     const user = await User.findById(req.user?.id ||req.user?._id); 
     //req.user || !req.user.id
    console.log(user);
    if (!user) {
        // return res.status(404).json({
        //     message: 'User not found',
        // });
    throw new ApiError(404, 'User not found');
    //return next(new ApiError(404, 'User not found'));
    }
    return res
    .status(200)
    .json(new ApiResponse(200, user, 'User found successfully'));
 
});
export const updateProfile = asyncHandler(async(req,res)=>{
   const userId = req.user._id|| req.user.id
    console.log("User ID:", userId);    

     const { description, name} = req.body;
     console.log(description,name);
     let photoUrl ;
     if(req.file){
        photoUrl = await uploadOnCloudinary(req.file.path);
          console.log("Cloudinary URL:", photoUrl);
     }
     const user = await User.findByIdAndUpdate(userId,{
        $set:{
            name,
            description,
            ...(photoUrl && { photoUrl })
        }},
        {new:true},
     )
     if(!user){
        throw new ApiError(404, 'User not found');
     }
     console.log(user);
 
     
     return res
     .status(200)
     .json(new ApiResponse(200, user, 'User updated successfully'));
    
});


