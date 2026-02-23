import { useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";



function Profile() {

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center bg-gradient-to-br from-black to-blue-500">
      <div className="bg-gray-200 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full">
        <FaArrowCircleLeft className="w-10 h-10 cursor-pointer" onClick={() => navigate("/")} />
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? <img src={userData?.photoUrl} alt="" className="w-32 h-32 rounded-full object-cover border-2 border-black" /> :
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-500">{userData?.name?.slice(0, 1)?.toUpperCase()}</span>
            </div>
          }
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{userData?.name}</h2>
          <p className="text-black font-bold">{userData?.role.toUpperCase()}</p>
        
        </div>

        <div className="mt-4">
          <div>
            <span className="font-semibold">Email:</span>
            <span>{userData?.email}</span>
          </div>

          <div>
            <span className="font-semibold">Bio:</span>
            <span>{userData?.description}  </span>
          </div>
          <div>
            <span className="font-semibold">Enrolled Courses: </span>
            <span>{userData?.enrollCourses?.length}</span>
          </div>
        </div>
    <div className="flex items-center justify-center">
    <button className="bg-black/80 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-black/60 transition-colors duration-300 "
    onClick={()=>navigate("/editprofile")}
    >Edit Profile</button>
    </div>
    </div>
    </div>
  )
};
export default Profile;

// function profile(){
//   return (
//     <div>
//       <h1>fdsjfhdsfdsf </h1>
//     </div>
//   )

// }

// export default profile;
