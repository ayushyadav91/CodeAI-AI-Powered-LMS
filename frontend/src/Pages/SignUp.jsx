import { useState } from "react";
import image from "../assets/image.png";
import google from "../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);



  const handleSignUp = async () => {
    setLoading(true);
    try {

     const result = await axios.post(`${serverUrl}/api/v1/auth/register`, {
        name,
        email,
        password,
        role,
      },{withCredentials:true});
      console.log(result.data);
      setLoading(false);
      navigate("/");
      toast.done("SignUp Successful");
      // if (result.data.success) {
      //   toast.success("SignUp Successful");
      //   navigate("/");
      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[620px] bg-white shadow-xl rounded-2xl flex overflow-hidden" 
      onSubmit={(e) => e.preventDefault()}
      >
   

   
        {/* LEFT SECTION */}
        <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center gap-4">
          
          <div className="text-center">
            <h1 className="font-semibold text-2xl text-black">
              Let's get started
            </h1>
            <p className="text-[#999797] text-[16px]">
              Create your account
            </p>
          </div>

          {/* NAME */}
          <div className="w-[80%] flex flex-col gap-1">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="border w-full h-[35px] px-4 text-sm rounded-md"
              onChange={(e) => setName(e.target.value)} value={name}
            />
          </div>

          {/* EMAIL */}
          <div className="w-[80%] flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="border w-full h-[35px] px-4 text-sm rounded-md"
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>

          {/* PASSWORD */}
          <div className="w-[80%] flex flex-col gap-1 relative">
            <label className="font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="border w-full h-[35px] px-4 text-sm rounded-md"
              onChange={(e) => setPassword(e.target.value)} value={password}
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?   <FaEye /> :<FaEyeSlash />}
            </span>
          </div>

          {/* ROLE BUTTONS */}
          <div className="flex gap-4">
            <span
    className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer
      hover:border-black
      ${role === "student" ? "border-black" : "border-[#e7e6e6]"}`}
    onClick={() => setRole("student")}
  >
    Student
  </span>

  <span
    className={`px-[10px] py-[5px] border-[2px] rounded-xl cursor-pointer
      hover:border-black
      ${role === "educator" ? "border-black" : "border-[#e7e6e6]"}`}
    onClick={() => setRole("educator")}
  >
    Educator
  </span>
          </div>

          {/* SIGN UP BUTTON */}
          <button className="w-[70%] h-[40px] bg-black text-white rounded-md"
          onClick={handleSignUp}
          disabled={loading}
          >
            {loading ? <ClipLoader size={30} color={"#fff"} /> : "Sign Up"}
          </button>

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
          {/* NAVIGATION TO lOGIN PAGE */}
          <div className="flex items-center justify-center gap-2 text-sm  text-gray-600">
               Already have an account? <span className="text-lg text-black underline underline-offset-2 decoration-1 decoration-black hover:decoration-none"
               onClick={()=>navigate("/login")}
               >Login</span>
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
  );
};

export default SignUp;


// import image from '../assets/image.png'
// import google from '../assets/google.png'
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";


// function SignUp() {
//     const [showPassword, setShowPassword] = useState(false);
// const SignUp = () => {
//   return (
//     <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center '>

//         <form className="w-[90] md:w-200 h-140 bg-[white] shadow-xl rounded-2xl flex">
        
//         <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col justify-center items-center gap-3">
//             {/* leftdiv */}
//             <div>
//                 <h1 className='font-semibold text-[black] text-2xl'>Let's get Started</h1>
//                 <h2 className='text-[#999797] text-[18px]'> Create Your Account </h2>

//                 <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//                     <label htmlFor="name" className='font-semibold'>Name</label>
//                    <input type="text" id="name" className='border-1 w-[140%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name'/>
//                 </div>

//                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
//                     <label htmlFor="Email" className='font-semibold'>Email</label>
//                     <input type="email" id="email" className='border-1 w-[140%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your Email'/>
//                 </div>

//                  <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
//                     <label htmlFor="Password" className='font-semibold'>Password</label>
    
//                    <input type="text" id="password" className='border-1 w-[140%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your Password'/>
//                  { !showPassword? < FaEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' />
//                    <FaEyeSlash className='absolute w-[20px] h-[20px] cusrsor-pointer right-[5%] bottom-[10%]' /> onClick={()=>setShowPassword(!showPassword)}   
//                 </div>

//            <div className="flex md:w-[50%] w-[70%] items-center justify-between"></div>
//                       <span className='px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Student</span>
//                       <span className='px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black'>Educator</span>
//             </div>
//             <button className='w-[70%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]'>SignUP</button>

//                 {/* google auth div */}
// <div className="w-[80%] flex  items-center  gap-2 ">
//     <div className='w-[25%] h-[25%] bg-[#dddbdb] rounded-full'></div>
//     <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue with</div>
//     <div className=' w-[25%] h-[25%] bg-[#dddbdb] rounded-full'></div>
// </div>
 
//  <div className='w-[70%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center'>


//    <img src={google} alt="google" className='w-[20px] h-[20px] rounded-full' />
//    <span className='text-[15px] text-[#6f6f6f] ml-[5px]'>Continue with Google</span>
   
//     </div>
    



//  </div>





//   {/* rightdiv */}

//      <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex flex-col justify-center items-center hidden">
    
//        <img src={image} alt="image" className=" w-[600%] max-w-[400px] rounded-2xl shadow-2xl" />
//         <span className='text-4xl  text-white'>Online Courses</span>
//        </div>

//         </form>
//     </div>
    
//   )
// }

// export default SignUp
