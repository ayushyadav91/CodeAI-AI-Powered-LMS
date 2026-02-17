
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [step, setStep] = useState(3);
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
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
                        <form>
                            <div className='mb-4'>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Enter your Email Address</label>
                                <input type='email' id='email' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>Forget Password</button>
                            <p className='text-center mt-4' onClick={() => navigate('/login')}>Back to Login</p>
                        </form>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2 className='text-2xl font-bold mb-6 text-center'>Verify OTP</h2>
                        <form>
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
                            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-blue-600'>Verify OTP</button>
                        </form>
                    </>
                )}
                {step === 3 && (
                    <>
                        <h2 className='text-2xl font-bold mb-3 text-center'>Reset Your Password</h2>
                        <p className='text-center text-gray-500 mt-0 mb-2'>Enter a new password below.</p>
                        <form>
                            <div className='mb-4'>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
                                <input type='password' id='password' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
                                <input type='password' id='confirmPassword' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-black' />
                            </div>
                            <button type='submit' className='w-full bg-black text-white py-2 rounded-md hover:bg-blue-600'>Reset Password</button>
                                <p className='text-center mt-4' onClick={() => navigate('/login')}>Back to Login</p>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgetPassword
