import mongoose from "mongoose";

const connectDB = async ()=>{
     try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is Connected Successfully");
     } catch(error){
        console.log("DB Connection error");
        console.log(error.message);
     }

}
export default connectDB;