import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";

const Dashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();


    return (
        <div className='flex min-h-screen bg-gray-100'>

            <div className='w-full px-2 py-9 bg-red-200  space-y-10 '>
                <FaArrowCircleLeft className="w-[22px]   absolute top-[10%] left-[10%] h-[22px] cursor-pointer" onClick={() => navigate("/")} />

                {/* main Section */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-5 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition-shadow duration-300">

                    {/* Profile Image */}
                    <img
                        src={userData?.photoUrl || " "}
                        alt=" "
                        className="w-28 h-28 rounded-full object-cover border-4 border-black-500 shadow-lg hover:scale-105 transition-transform duration-300"
                    />

                    {/* User Info */}
                    <div className='flex-1 text-center md:text-left space-y-3'>
                        <h1 className='text-3xl font-extrabold text-gray-900'>Welcome, {userData?.name || 'Educator'}!</h1>

                        <h2 className='text-xl font-semibold text-gray-700'>
                            Total Earnings: <span className="text-gray-500">{userData?.earning || '0'}$</span>
                        </h2>

                        <p className='text-gray-500 font-light text-sm'>
                            {userData?.description || 'Start Creating Courses'}
                        </p>

                        <button
                            onClick={() => navigate('/courses')}
                            className="mt-1 px-5 py-2 bg-gradient-to-r from-gray-500 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Create Courses
                        </button>
                    </div>

                </div>


                {/* Graph Section */}
                <div className=''>

                </div>

            </div>

        </div>
    )
}

export default Dashboard