import { useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";



function EditProfile() {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name ,setName] = useState(userData.name || "");
    const [description ,setDescription] = useState(userData.description || "");
    const [photoUrl ,setPhotoUrl] = useState(userData.photoUrl || "");
    const [loading,setLoading] = useState(false);



    const handleUpdate = async(e) => {
       try{
        setLoading(true);
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("photoUrl",photoUrl);
        const response = await axios.put(`${serverUrl}/api/v1/user/update`,formData, {withCredentials:true});
        dispatch(updateUser(response.data));
        setLoading(false);
        navigate("/");
        toast.success("Profile updated successfully");
       }
       catch(error){
        setLoading(false);
        toast.error(error.response.data.message);
       }

    } 
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center  bg-gradient-to-br from-black to-blue-500">
            <div className="bg-gray-200 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full">
                <div >
                <FaArrowCircleLeft className="w-10 h-10 cursor-pointer" onClick={() => navigate("/")} />
                <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center border-b-2 border-black pb-2 ">Edit Your Profile</h2>
                </div>
                <form  onSubmit={(e)=>e.preventDefault() }>
                    <div className="flex flex-col items-center text-center mt-5">
                        {userData?.photoUrl ? <img src={userData?.photoUrl} alt="" className="w-32 h-32 rounded-full object-cover border-2 border-black shadow-lg shadow-black/50" /> :
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-4xl font-bold text-gray-500">{userData?.name?.slice(0, 1)?.toUpperCase()}</span>
                            </div>
                        }

                    </div>

                    <div >
                        <label htmlFor="iamge" className="text-sm font-medium text-gray-700">Select Avatar</label>
                        <input type="file" id="image" name="photoUrl" placeholder="photoUrl"
                        accept="image/*"
                        className="w-full px-4 py-2 border rounded-md text-sm"
                        onChange={(e)=>setPhotoUrl(e.target.files[0])}
                        />
                    </div>
                     <div >
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Enter You Name</label>
                        <input type="text" id="name" name="name" placeholder={userData?.name}
                        className="w-full px-4 py-2 border rounded-md text-sm"  
                        onChange={(e)=>setName(e.target.value)} value={name}
                        />
                    </div>
                     <div >
                        <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email</label>
                        <input readOnly type="text" id="email" name="email" placeholder={userData?.email}
                        className="w-full px-4 py-2 border rounded-md text-sm"/>
                    </div>
                    <div >
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        <textarea  type="text" id="email" name="desription"placeholder="Tell us about yourself" rows={3}
                        className="w-full px-4 py-2 border border-gray-500 rounded-md resize-none focus:ring-2 focus:ring-black outline-none text-sm"
                        onChange={(e)=>setDescription(e.target.value)} value={description}
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-md mt-4 cursor-pointer hover:bg-black/80 transition-colors duration-300"
                    onClick={handleUpdate}
                    disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>


                </form>
            </div>
        </div>
    )
}

export default EditProfile