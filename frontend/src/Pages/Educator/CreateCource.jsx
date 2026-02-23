import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateCource = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setcategory] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleCreateCourse = async()=>{
    setLoading(true);
    try{
        const result = await axios.post(`${serverUrl}/api/v1/course/create`,
            {
                title, category
            },
            {withCredentials:true});
            console.log(result.data);
            navigate("/courses");
            setLoading(false);
            toast.success("Course Created")
    }catch(error){
        console.log(error)
       toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
        setLoading(false);
    }

  }
 



  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      
      <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-lg mt-10 relative rounded-xl">

        <FaArrowLeft
          className="absolute top-5 left-5 w-[22px] h-[22px] cursor-pointer hover:text-gray-600 transition"
          onClick={() => navigate("/")}
        />

        <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center border-b-2 border-black pb-2">
          Create Your Course
        </h2>

        <form className="space-y-5 mt-5"
        onSubmit={(e)=>e.preventDefault()}
        >

          <div>
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Course Title"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Course Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e)=>setcategory(e.target.value)}>
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
        </form>
        <button className="w-full mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        disabled={loading}
         onClick={handleCreateCourse}
        >
         {loading?<ClipLoader size={30} color='white'/>:"Create Course"}
        </button>

      </div>
    </div>
  );
};

export default CreateCource;