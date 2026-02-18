
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import {serverUrl} from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

      

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(['', '', '', '']);
    const [newPassword, setNewPasswrod]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading,setLoading]=useState(false);
    

    //setp 1
    const sendotp=async()=>{
       setLoading(true); 
        try {
           const response = await axios.post(`${serverUrl}/api/v1/auth/sent-otp`,{email},{withCredentials:true});
             console.log(response.data);
             setStep(2);
             toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    //step 2
    const otpString = otp.join("");
    const verfiyOtp =  async()=>{
        setLoading(true);
        try {
            const response = await axios.post(`${serverUrl}/api/v1/auth/verify-otp`,{email,otp:otpString},{withCredentials:true});
            console.log(response.data);
            setStep(3);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    //step 3
    const resetPassword = async()=>{
          if(newPassword !== confirmPassword){
                toast.error("Password do not match");
                return;
            }
              if (!newPassword || !confirmPassword) {
             toast.error("Enter password");
          return;
    }

        setLoading(true);
        try {
          
            const response = await axios.post(`${serverUrl}/api/v1/auth/reset-password`,{email,newPassword:confirmPassword},{withCredentials:true});
            console.log(response.data);
            navigate('/login');
            toast.success(response.data.message);
        }catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                {step === 1 && (
                    <>
                        <h2 className='text-2xl font-bold mb-6 text-center'>Forget Your Password</h2>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <div className='mb-4'>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Enter your Email Address</label>
                                <input type='email' id='email' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800'
                            onClick={sendotp}
                            disabled={loading}
                            >{loading ? <ClipLoader size={30} color='blue'/> : "Send OTP"}</button>
                            <p className='text-center mt-4' onClick={() => navigate('/login')}>Back to Login</p>
                        </form>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className='text-2xl font-bold mb-6 text-center'>Verify OTP</h2>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <p className='text-center mt-0 mb-4'>Enter the OTP sent to your email address</p>
                            <div className='flex justify-center gap-4 mb-4'>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type='text'
                                        maxLength='1'
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className='w-12 h-12 text-center border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
                                    />
                                ))}
                            </div>
                            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-blue-600' 
                            onClick={verfiyOtp}
                            disabled={loading}
                            >{loading ? <ClipLoader size={30} color='blue'/> : "Verify OTP"}</button>
                        </form>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className='text-2xl font-bold mb-3 text-center'>Reset Your Password</h2>
                        <p className='text-center text-gray-500 mt-0 mb-2'>Enter a new password below.</p>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <div className='mb-4'>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2' 

                                >New Password</label>
                                <input type='password' id='password' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
                                   onChange={(e)=>setNewPasswrod(e.target.value)}/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2' >Confirm Password</label>
                                <input type='password' id='confirmPassword' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-black'  onChange={(e)=>setConfirmPassword(e.target.value)} />
                            </div>
                            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-blue-600'
                            onClick={resetPassword}
                            disabled={loading}
                            >{loading ? <ClipLoader size={30} color='blue'/> : "Reset Password"}</button>
                                <p className='text-center mt-4' onClick={() => navigate('/login')}>Back to Login</p>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgetPassword
