import React from 'react'
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import image from "../../assets/empty.jpg";
import { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../App';
import { useDispatch } from 'react-redux';
import { setCreaterCourseData } from '../../redux/courseSlice.js';
import { useSelector } from 'react-redux';


const Courses = () => {
    const navigate = useNavigate();
    const createrCourseData = useSelector((state) => state.course.createrCourseData);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
   useEffect(() => {
if (!userData?._id) return; // wait until userData is loaded
  const fetchCreatorCourses = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/v1/course/getcreator`, {
        withCredentials: true,
      });
      console.log("Fetched courses:", data);
      dispatch(setCreaterCourseData(data.data));
    } catch (err) {
      console.error(err);
    }
  };

  fetchCreatorCourses();
}, [userData?._id, dispatch]); // only track the user ID
   
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

            {/* Header Section */}
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <FaArrowLeft
                        className="w-5 h-5 cursor-pointer hover:text-gray-600 transition"
                        onClick={() => navigate("/dashboard")}
                    />
                    <h1 className="text-2xl font-semibold">All Created Courses</h1>
                </div>
                <button
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    onClick={() => navigate("/createcourse")}>
                    Create Courses
                </button>
            </div>

            {/* Large Screen Table */}
            <div className="hidden md:block max-w-6xl mx-auto bg-white rounded-xl shadow p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-4">Courses</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-left py-3 px-4">Category</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createrCourseData?.length > 0 ? (
                            createrCourseData.map((course) => (
                                <tr key={course._id} className="border-b hover:bg-gray-100 transition duration-200">

                                    {/* Course Thumbnail + Title */}
                                    <td className=" flex px-4 py-3">
                                        <img
                                            src={course?.thumbnail || image}
                                            alt={course?.title}
                                            className="w-24 h-16 object-cover rounded-md"
                                        />
                                        <span className="block mt-5 text-sm font-semibold pl-2">{course?.title}</span>
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        {course.price ? `$${course.price}` : "$NA"}
                                    </td>

                                    {/* Category */}
                                    <td className="px-4 py-3">{course.category}</td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${course.isPublished
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}>
                                            {course.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-4 py-3">
                                        <FaEdit
                                            className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                                            onClick={() => navigate(`/editcourse/${course?._id}`)}
                                        />
                                    </td>

                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-400">
                                    No courses found. Create your first course!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <p className='text-center text-sm text-gray-400 mt-6'>
                    A list of your recent courses.
                </p>
            </div>

            {/* Small Screen Cards */}
            <div className='md:hidden max-w-6xl mx-auto space-y-4'>
                {createrCourseData?.length > 0 ? (
                    createrCourseData.map((course) => (
                        <div key={course._id} className='bg-white rounded-lg shadow p-4 flex flex-col gap-4'>

                            {/* Top Section */}
                            <div className='flex gap-4 items-center'>
                                <img
                                    src={course.thumbnail || image}
                                    alt={course.title}
                                    className="w-20 h-14 object-cover rounded-md"
                                />
                                <div>
                                    <h2 className='font-semibold text-gray-800'>{course.title}</h2>
                                    <p className='text-sm text-gray-500'>
                                        {course.price ? `$${course.price}` : "Free"}
                                    </p>
                                    <p className='text-xs text-gray-400'>{course.category}</p>
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <div className='flex justify-between items-center'>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${course.isPublished
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}>
                                    {course.isPublished ? "Published" : "Draft"}
                                </span>
                                <FaEdit
                                    className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                                    onClick={() => navigate(`/editcourse/${course._id}`)}
                                />
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 bg-white rounded-lg shadow">
                        No courses found. Create your first course!
                    </div>
                )}

                <p className='text-center text-sm text-gray-400 mt-4'>
                    A list of your recent courses.
                </p>
            </div>

        </div>
    )
}

export default Courses