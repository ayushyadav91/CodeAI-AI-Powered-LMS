
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


export const serverUrl =  "http://localhost:2030";

function App() {
  getCurrentUser();
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
    </Routes>
    
    </>

  )
}

export default App