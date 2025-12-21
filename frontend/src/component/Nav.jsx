import React from 'react'
import image from '../assets/img.png'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'
import { serverUrl } from '../App'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'





const Nav = () => {

    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatchEvent = useDispatch(); 
    const [show, setShow] = userState(false);


    const handleLogout = async () => { 
         console.log("LOGOUT CLICKED");
        try{
    const result = await axios.post(`${serverUrl}/api/v1/auth/logout`,{},{withCredentials:true});
           dispatchEvent(setUserData(null));
            navigate("/");
           toast.success(result.data.message || "Logout Successful");
        }    
        catch(error){
            console.log(error);
            toast.error(error.response.data.message || "Logout Failed");
        }

    };


  return (
    <div className='w-full h-[60px] fixed top-0 px-5 flex items-center justify-between bg-[#d1d1d1] z-10'>

      {/* LEFT - LOGO */}
      <div className='flex items-center'>
        <img src={image} alt="logo" className='w-[60px] h-[40px]' />
      </div>

      {/* RIGHT - MENU */}
      <div className='flex items-center gap-4'>
      {!userData &&  <IoPersonCircleSharp className='w-[50px] h-[60px] cursor-pointer' />}
    { userData &&<div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] 
     border-2 bg-black border-white cursor-pointer'></div>}

        {userData ?.role=="educator" && <button className='px-[20px] py-[7px] border-2 border-white bg-[black] rounded-[10px] text-[16px] font-light text-white cursor-pointer'>
          Dashboard
        </button>}

    {! userData ? <button className='px-[20px] py-[7px] border-2 border-white bg-[black] rounded-[10px] text-[16px]   font-light text-white cursor-pointer'
     onClick={()=>navigate("/login")}>
        Login
    </button>:

        <button className='px-[15px] py-[4px] bg-white text-black rounded-[7px] shadow-sm shadow-black  text-[20px] cursor-pointer'
      onClick={handleLogout}
        >
          Logout
        </button>}
      </div>

    </div>
  )
}

export default Nav
