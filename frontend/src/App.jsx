import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Profile from './Pages/Profile.jsx';
import { Navigate } from 'react-router-dom';
import ForgetPassword from './Pages/ForgetPassword.jsx';
import EditProfile from './Pages/EditProfile.jsx';
import Dashboard from './Pages/Educator/Dashboard.jsx';
import Courses from './Pages/Educator/Courses.jsx';
import CreateCource from './Pages/Educator/CreateCource.jsx';
import getCreaterCourse from './customHooks/getCreaterCourse.js';
import  EditCourses from './Pages/Educator/EditCourses.jsx';



export const serverUrl =  "http://localhost:2030";

function App() {
  getCurrentUser();
  getCreaterCourse();
 
  const {userData} = useSelector((state) => state.user);
  return (
    <>

    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"}/>}/>
      <Route path="/profile" element={userData? <Profile /> : <Navigate to={"/signup"}/>} />
      <Route path="/forget" element={!userData ? <ForgetPassword /> : <Navigate to={"/signup"}/>} />
      <Route path="/editprofile" element={userData? <EditProfile /> : <Navigate to={"/signup"}/>} />
      <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"}/>} />
      <Route path="/courses" element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"}/>} />
       <Route path="/createcourse" element={userData?.role === "educator" ? <CreateCource /> : <Navigate to={"/signup"}/>} />
       <Route path="/editcourse/:id" element={userData?.role === "educator" ? < EditCourses /> : <Navigate to={"/signup"}/>} />
    </Routes>
    </>
  )
}

export default App