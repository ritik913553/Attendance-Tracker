import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from 'react-hook-form';
const ForgotPassword = () => {
    const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
    const handleForgotPassword = ()=>{
    }
    const getOtp = async (e)=>{
        e.preventDefault();
        await axios.post('/ap1/v1/auth/request-otp')
    }
  return (
    <div className='w-full text-white '>
      <div className='w-full flex flex-col items-center justify-center mt-10 '>

        <div className="w-full mt-20 sm:mt-10  sm:px-4 px-2 flex items-center justify-center">
        <h1 className="text-2xl font-semibold mb-1 text-white ">
          Reset Your Password
        </h1>
        </div>

        <div className="px-5 py-2 rounded">
          <div 
            style={{
            boxShadow: '0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(255, 255, 255, 0.3)',
            }} 
            className="bg-[#121212] py-3 sm:p-3 shadow-lg w-full  flex flex-col justify-center mt-5 sm:mt-1 mb-5 rounded-xl">
            <form className='px-2'>
              {/* Email */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm">Email Address *</label>
                <div className="relative flex items-center mt-2">
                  <input
                      {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm">Password *</label>
                <div className="relative flex items-center mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                    placeholder="Enter your password here"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                  <span className="absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* otp */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm">Enter Otp *</label>
                <div className="relative flex items-center mt-2 gap-3">
                  <input
                    {...register("otp", { required: "Otp is required", pattern: {
                      value: /^[0-9]{4}$/, // Only 4-digit numbers
                      message: "OTP must be a 4-digit number",
                    },maxLength: {
                      value: 4,
                      message: "OTP cannot exceed 4 digits",
                    },})}
                    type='text'
                    inputMode="numeric"  // Optimizes mobile keyboard for numbers
                    maxLength={4}  // Limits input to 4 characters
                    placeholder="Enter otp"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                  /> <span
                  className='bg-[#5c4cf0] hover:bg-[#6c72c5] w-40 flex items-center justify-center px-4 py-2 rounded-md text-black cursor-pointer'>Get Otp</span>
                </div>
              </div>

              {/* Submit Button */}
              <div onClick={() => navigate('/')}
              className="flex items-center justify-center mt-4">
                <button type="submit" className="w-full px-10 py-1 rounded bg-[#5c4cf0] hover:bg-[#6c72c5] text-black cursor-pointer">
                  Reset Password
                </button>
              </div>

            </form>
          
          </div>
        </div>
        
      </div>
     
    </div>
  )
}

export default ForgotPassword
