import  User  from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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
