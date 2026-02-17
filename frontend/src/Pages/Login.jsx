
import { useState } from "react";
import image from "../assets/image.png";
import google from "../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


 
  
const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
     const navigate = useNavigate();

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [loading, setLoading] = useState(false);
     const dispatchEvent = useDispatch();



     const handleLogin = async () => {
       setLoading(true);
       try {

         const result = await axios.post(`${serverUrl}/api/v1/auth/login`, {
           email,
           password,
         },{withCredentials:true});
         dispatchEvent(setUserData(result.data.data));
         setLoading(false);
         navigate("/");
         toast.success("Login Successful");
         // if (result.data.success) {
         //   toast.success("Login Successful");
         //   navigate("/");

        } catch (error) {
          console.log(error);
          setLoading(false);
          // toast.error(error.response.data.message || "Login failed");
          toast.error(error.response?.data?.message || "Login failed");

        }
      };
  return (

     <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
          <form className="w-[90%] md:w-[800px] h-[620px] bg-white shadow-xl rounded-2xl flex overflow-hidden"
          onSubmit={(e)=>e.preventDefault()}
          >
       
  
            {/* LEFT SECTION */}
            <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center gap-4">
              
              <div className="text-center">
                <h1 className="font-semibold text-2xl text-black">
                  Welcome Back
                </h1>
                <p className="text-[#999797] text-[16px]">
                  Login in  your account
                </p>
              </div>
    
              {/* EMAIL */}
              <div className="w-[80%] flex flex-col gap-1">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="border w-full h-[35px] px-4 text-sm rounded-md"
                 onChange={(e)=>setEmail(e.target.value)} value={email}
                />
              </div>
    
              {/* PASSWORD */}
              <div className="w-[80%] flex flex-col gap-1 relative">
                <label className="font-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="border w-full h-[35px] px-4 text-sm rounded-md"
                  onChange={(e)=>setPassword(e.target.value)} value={password}
                />
    
                <span
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?   <FaEye /> :<FaEyeSlash />}
                </span>
              </div>
    
              
              {/* SIGN UP BUTTON */}
              <button className="w-[70%] h-[40px] bg-black text-white rounded-md"
              disabled={loading}
              onClick={handleLogin}
              >
                {loading ? <ClipLoader size={30} color={"#fff"} /> : "Login"}
              </button>

              {/* FORGET PASSWORD */}
              <span className=" ml-30 inline-block translate-x-4 -translate-y-2 text-[15px] cursor-pointer text-[#585757]  " 
              onClick={()=>navigate("/forget")}
              >Forgot Password ?</span>
    
              {/* DIVIDER */}
              <div className="w-[80%] flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <span className="text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>
    
              {/* GOOGLE BUTTON */}
              <div className="w-[70%] h-[40px] border rounded-md flex items-center justify-center gap-2 cursor-pointer">
                <img src={google} alt="google" className="w-5 h-5" />
                <span className="text-sm text-gray-600">
                  Continue with Google
                </span>
              </div>

               {/* NAVIGATION TO SignUp PAGE */}
                 <div className="flex items-center justify-center gap-2 text-sm  text-gray-600">
               Don't have an account? <span className="text-lg text-black underline underline-offset-2 decoration-1 decoration-black hover:decoration-none"
               onClick={()=>navigate("/signup")}
               >SignUp</span>
          </div>
            </div>
    
            {/* RIGHT SECTION */}
            <div className="w-1/2 h-full bg-black hidden md:flex flex-col justify-center items-center gap-4">
              <img
                src={image}
                alt="course"
                className="max-w-[300px] rounded-2xl shadow-2xl"
              />
              <span className="text-3xl text-white font-semibold">
                Online Courses
              </span>
            </div>
    
          </form>
        </div>
  )
}

export default Login