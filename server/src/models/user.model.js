import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    description:{
       type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,


    },
    password:{
        type:String,
        required:true,
        minlength:[6,"min 6 length is required"],
       
    },
   
    role:{
        type:String,
        enum:["student","educator"],
        required:true,
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrollCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",

    }],
    resetOtp:{
        type:String,
    },
    otpExpiry:{
        type:Date,
    },
    isOtpVerified:{
        type:Boolean,
        default:false,
    }


},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;