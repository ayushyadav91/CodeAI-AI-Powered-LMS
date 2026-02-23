import React, { useState, useRef, useEffect } from 'react';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import image from "../../assets/empty.jpg";
import { TbPhotoEdit } from "react-icons/tb";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";

const EditCourses = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  const [isPublished, setIsPublished] = useState(false);
  const thumb = useRef();
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const getCourseById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/course/getcourse/${id}`,
        { withCredentials: true }
      );
      const course = result.data.data;
      setTitle(course.title || "");
      setSubtitle(course.subtitle || "");
      setDescription(course.description || "");
      setCategory(course.category || "");
      setLevel(course.level || "");
      setPrice(course.price || "");
      setIsPublished(course.isPublished || false);
      setFrontendImage(course.thumbnail || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubtitle(selectCourse.subtitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setIsPublished(selectCourse.isPublished || false);
      setFrontendImage(selectCourse.thumbnail || image);
      setBackendImage(selectCourse?.thumbnail || null);
    }
  }, [selectCourse]);

  useEffect(() => {
    if (courseId) {
      getCourseById();
    }
  }, [courseId]);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.put(
        `${serverUrl}/api/v1/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Course updated successfully");
      navigate("/courses");
      setLoading(false);
      setSelectCourse(result.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>

        {/* Top Bar */}
        <div className='px-6 py-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <FaArrowCircleLeft
              className='w-6 h-6 cursor-pointer text-gray-600 hover:text-black transition flex-shrink-0'
              onClick={() => navigate("/courses")}
            />
            <h2 className='text-lg sm:text-xl font-bold text-gray-800'>
              Add Course Information
            </h2>
          </div>
          <button
            className='bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition w-full sm:w-auto'
            onClick={() => navigate("/lectures")}
          >
            Go to Lecture Page
          </button>
        </div>

        {/* Form Body */}
        <div className='p-6 bg-gray-50 space-y-5'>
          <h2 className="text-base font-semibold text-gray-700">Basic Course Details</h2>

          {/* Publish / Remove Buttons */}
          <div className='flex flex-wrap gap-3'>
            <button
              className={`px-5 py-1.5 rounded-lg border text-sm font-medium transition
                ${!isPublished
                  ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-500 hover:text-white'
                  : 'bg-red-100 text-red-600 border-red-300 hover:bg-red-500 hover:text-white'
                }`}
              onClick={() => setIsPublished(prev => !prev)}
            >
              {!isPublished ? 'Click to Publish' : 'Click to Unpublish'}
            </button>
            <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition text-sm font-medium">
              Remove Course
            </button>
          </div>

          {/* Subtitle */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input
              type="text"
              className='w-full border border-gray-300 bg-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter the subtitle'
              onChange={(e) => setSubtitle(e.target.value)}
              value={subtitle}
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Course Description</label>
            <textarea
              rows={4}
              className='w-full border border-gray-300 bg-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              placeholder='Enter the description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Category, Level, Price */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
              <select className='w-full border border-gray-300 bg-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="App Development">App Development</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="AI Tools">AI Tools</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select className='w-full border border-gray-300 bg-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setLevel(e.target.value)} value={level}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Course Price ($)</label>
              <input
                type="number"
                className='w-full border border-gray-300 bg-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Course Thumbnail</label>
            <div
              className='relative w-full sm:w-72 h-44 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition group'
              onClick={() => thumb.current.click()}
            >
              <img
                src={frontendImage || image}
                alt="Course Thumbnail"
                className='w-full h-full object-cover'
              />
              {/* Hover Overlay */}
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                <TbPhotoEdit className='w-8 h-8 text-white' />
              </div>
            </div>
            <input
              type="file"
              hidden
              ref={thumb}
              accept='image/*'
              onChange={handleThumbnailChange}
            />
            <p className='text-xs text-gray-400 mt-1'>Click on image to change thumbnail</p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row justify-end gap-3 pt-2'>
            <button
              onClick={() => navigate("/courses")}
              className='border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-100 transition text-sm font-medium w-full sm:w-auto'
            >
              Cancel
            </button>
            <button
              onClick={handleEditCourse}
              disabled={loading}
              className='bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-700 transition text-sm font-medium w-full sm:w-auto disabled:opacity-50'
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCourses