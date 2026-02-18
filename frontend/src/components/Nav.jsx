
import image from '../assets/image.png'
import { IoPersonCircleSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Nav = () => {

  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [show, setShow] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  //handle logout
  const handleLogout = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/v1/auth/logout`, {}, { withCredentials: true });
      dispatchEvent(setUserData(null));
      navigate("/");
      toast.success(result.data.message || "Logout Successful");
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logout Failed");
    }
  };

  return (
    <div className='w-full h-[64px] fixed top-0 px-5 flex items-center justify-between bg-black border-b border-cyan-300/20 z-20 backdrop-blur-md'>

      {/* LEFT - LOGO */}
      <div className='flex items-center'>
        <img src={image} alt="logo" className='w-[98px] h-[94px]' />
      </div>

      {/* RIGHT - MENU - DESKTOP */}
      <div className='hidden md:flex items-center gap-4'>
        {!userData && <IoPersonCircleSharp className='w-[50px] h-[60px] cursor-pointer text-gray-300 hover:text-cyan-400 transition-colors duration-300' onClick={() => setShow(prev => !prev)} />}
       {userData?.photoUrl  ? <img src={userData?.photoUrl} alt="" className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] 
     border-2 bg-gradient-to-br from-cyan-500 to-blue-500 border-cyan-400/50 cursor-pointer hover:border-cyan-400 transition-all duration-300' onClick={() => setShow(prev => !prev)} /> : 
        <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] 
     border-2 bg-gradient-to-br from-cyan-500 to-blue-500 border-cyan-400/50 cursor-pointer hover:border-cyan-400 transition-all duration-300' onClick={() => setShow(prev => !prev)} >  {userData?.name?.[0]?.toUpperCase()}</div>}

        {userData?.role == "educator" && <button className='px-[20px] py-[7px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[10px] text-[16px] font-light text-white cursor-pointer hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300'>
          Dashboard
        </button>}

        {!userData ? <button className='px-[20px] py-[7px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[10px] text-[16px] font-light text-white cursor-pointer hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300'
          onClick={() => navigate("/login")}>
          Login
        </button> :

          <button className='px-[15px] py-[4px] bg-white text-black rounded-[7px] font-semibold text-[16px] cursor-pointer hover:bg-gray-200 transition-all duration-300'
            onClick={handleLogout}
          >
            Logout
          </button>}
          {show && <div className="absolute top-16 right-10 w-44 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-cyan-400/20 py-2 z-50 animate-fade-in"
          onMouseLeave={() => setShow(false)}>

            {userData ? <><span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200"
            onClick={() => { navigate("/profile"); } }>
            My Profile
          </span><span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200">
              My Courses
            </span></>
         : <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200"
             onClick={() => { navigate("/signup"); }}>
       SignUp
         </span>}

  

  </div>}
 </div>

      {/* HAMBURGER MENU - MOBILE */}
      <div className='md:hidden flex items-center gap-4'>
        <RxHamburgerMenu className='w-[30px] h-[30px] cursor-pointer text-white hover:text-cyan-400 transition-colors duration-300' onClick={() => setShowMobileMenu(prev => !prev)} />
        
        {showMobileMenu && <div className="absolute top-16 right-5 w-48 bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-cyan-400/20 py-2 z-50 animate-fade-in">
          {!userData && <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200" onClick={() => { navigate("/login"); setShowMobileMenu(false); }}>
            Profile
          </span>}
          
          {userData && <>
            <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200">
              My Profile
            </span>
            <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200">
              My Courses
            </span>
            {userData?.role == "educator" && <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200">
              Dashboard
            </span>}
            <span className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition-all duration-200" onClick={() => { handleLogout(); setShowMobileMenu(false); }}>
              Logout
            </span>
          </>}
        </div>}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Nav


















// import image from '../assets/codeai_logo_clean.png'
// import { IoPersonCircleSharp } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// const Nav = () => {

//   const { userData } = useSelector((state) => state.user)
//   const navigate = useNavigate();
//   const dispatchEvent = useDispatch();
//   const [show, setShow] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   //handle logout
//   const handleLogout = async () => {
//     try {
//       const result = await axios.post(`${serverUrl}/api/v1/auth/logout`, {}, { withCredentials: true });
//       dispatchEvent(setUserData(null));
//       navigate("/");
//       toast.success(result.data.message || "Logout Successful");
//     }
//     catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message || "Logout Failed");
//     }
//   };

//   return (
//     <div className='w-full h-[60px] fixed top-0 px-5 flex items-center justify-between bg-[#d1d1d1] z-10'>

//       {/* LEFT - LOGO */}
//       <div className='flex items-center'>
//         <img src={image} alt="logo" className='w-[86px] h-[82px]' />
//       </div>

//       {/* RIGHT - MENU - DESKTOP */}
//       <div className='hidden md:flex items-center gap-4'>
//         {!userData && <IoPersonCircleSharp className='w-[50px] h-[60px] cursor-pointer' onClick={() => setShow(prev => !prev)} />}
//         {userData && <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] 
//      border-2 bg-black border-white cursor-pointer' onClick={() => setShow(prev => !prev)} >  {userData?.name?.[0]?.toUpperCase()}</div>}

//         {userData?.role == "educator" && <button className='px-[20px] py-[7px] border-2 border-white bg-[black] rounded-[10px] text-[16px] font-light text-white cursor-pointer'>
//           Dashboard
//         </button>}

//         {!userData ? <button className='px-[20px] py-[7px] border-2 border-white bg-[black] rounded-[10px] text-[16px]   font-light text-white cursor-pointer'
//           onClick={() => navigate("/login")}>
//           Login
//         </button> :

//           <button className='px-[15px] py-[4px] bg-white text-black rounded-[7px] shadow-sm shadow-black  text-[20px] cursor-pointer'
//             onClick={handleLogout}
//           >
//             Logout
//           </button>}
//           {show && <div className="absolute  top-16 right-10 w-44 bg-white rounded-xl shadow-lg border-1 border-black-200 py-2 z-50 " 
//           onMouseLeave={() => setShow(false)}>

//   <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200">
//     My Profile
//   </span>

//   <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200">
//     My Courses
//   </span>

//   </div>}
//  </div>

//       {/* HAMBURGER MENU - MOBILE */}
//       <div className='md:hidden flex items-center gap-4'>
//         <RxHamburgerMenu className='w-[30px] h-[30px] cursor-pointer' onClick={() => setShowMobileMenu(prev => !prev)} />
        
//         {showMobileMenu && <div className="absolute top-16 right-5 w-48 bg-white rounded-xl shadow-lg border-1 border-black-200 py-2 z-50">
//           {!userData && <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200" onClick={() => { navigate("/login"); setShowMobileMenu(false); }}>
//             Profile
//           </span>}
          
//           {userData && <>
//             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200">
//               My Profile
//             </span>
//             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200">
//               My Courses
//             </span>
//             {userData?.role == "educator" && <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200">
//               Dashboard
//             </span>}
//             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-black cursor-pointer transition-all duration-200" onClick={() => { handleLogout(); setShowMobileMenu(false); }}>
//               Logout
//             </span>
//           </>}
//         </div>}
//       </div>
//     </div>
//   )
// }

// export default Nav