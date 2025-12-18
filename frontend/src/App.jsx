
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js';




export const serverUrl = "http://localhost:2030";


function App() {
  getCurrentUser();
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    
    </>

  )
}

export default App