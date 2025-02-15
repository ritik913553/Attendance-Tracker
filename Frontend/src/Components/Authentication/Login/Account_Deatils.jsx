import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";
import API from "../../../Utils/Axios";
import toast from 'react-hot-toast'
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

function AccountDetails() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {googleLogin}=useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await  API.post('/users/signup',data);
      if(response.status === 201){
        toast.success("User registered successfully!Please verify your email",{duration:4000,})
        navigate('/')
      }
      console.log(response);
    } catch (error) {
      console.log((error));
      
      toast.error("Something went wrong during account creation!")
    }
    reset();
  };

  const loginWithGoogleHandler = async (e)=>{
      e.preventDefault();
      try {
        window.location.href = "http://localhost:8000/api/v1/auth/login-with-google"; 
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="w-full h-full flex flex-col sm:items-center px-3 sm:px-0 text-white">
      <div className=" sm:w-[45%]">
      <div className="w-full flex flex-col mt-20 sm:mt-10  sm:px-4 px-2">
        <h1 className="text-4xl font-semibold mb-1 text-white ">
          Sign Up
        </h1>
        <div className="flex items-center text-zinc-400 ">
          <p className="text-sm">Already have an account?</p>
          <Link
            onClick={() => navigate(-1)}
            className="text-sm ml-2 text-blue-600"
          >
            Sign in
          </Link>
        </div>
      </div>

        <div className="px-1 py-2  rounded mt-3">
          <div 
            style={{
            boxShadow: '0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(255, 255, 255, 0.3)',
            }} 
           className="bg-[#121212] p-6 shadow-lg w-full min-h-[90px] flex flex-col justify-center mt-5 sm:mt-1 mb-5 rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm mb-1">Full Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter Your Full Name"
                  className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm">Email Address *</label>
                <div className="relative flex items-center mt-1">
                  <input
                    {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                  <span className="absolute right-4 text-gray-400">
                    <FaTumblr size={20} />
                  </span>
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col mb-3">
                <label className="text-gray-300 text-sm">Password *</label>
                <div className="relative flex items-center mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                    placeholder="Enter your password here"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                  <span className="absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-4">
                <button type="submit" className="w-full px-10 py-1 rounded bg-[#5c4cf0] hover:bg-[#6c72c5] text-black cursor-pointer">
                  Create Account
                </button>
              </div>

            </form>
          </div>

          <div className="divider text-white flex items-center justify-center py-1 mt-2 ">
            <div className="h-[1px] w-[45%] bg-zinc-400"></div>
            <p>Or</p>
            <div className="h-[1px] w-[50%] bg-zinc-400"></div>
          </div>

        {/* Google Sign In */}
        <button onClick={googleLogin} className="inline-block w-full cursor-pointer mt-5">
          <div
            href=""
            className="btn  strategy flex items-center justify-center gap-5 text-lg border-[1px] border-zinc-400 w-full py-2 rounded-full "
          >
            <img
              src="data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M17.4612 7.21757H16.751V7.18098H8.81632V10.7075H13.7989C13.072 12.7604 11.1187 14.234 8.81632 14.234C5.89503 14.234 3.52653 11.8655 3.52653 8.94425C3.52653 6.02296 5.89503 3.65446 8.81632 3.65446C10.1648 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1385 0.12793 8.81632 0.12793C3.94751 0.12793 0 4.07544 0 8.94425C0 13.8131 3.94751 17.7606 8.81632 17.7606C13.6851 17.7606 17.6326 13.8131 17.6326 8.94425C17.6326 8.35311 17.5718 7.77609 17.4612 7.21757Z' fill='%23FFC107' /%3E%3Cpath d='M1.0166 4.84069L3.9132 6.96498C4.69697 5.02451 6.59513 3.65446 8.8164 3.65446C10.1649 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1386 0.12793 8.8164 0.12793C5.43005 0.12793 2.49333 2.03975 1.0166 4.84069Z' fill='%23FF3D00' /%3E%3Cpath d='M8.8165 17.7612C11.0938 17.7612 13.1629 16.8897 14.7274 15.4725L11.9988 13.1635C11.0839 13.8593 9.96591 14.2356 8.8165 14.2347C6.52338 14.2347 4.57629 12.7725 3.84278 10.7319L0.967773 12.947C2.42687 15.8022 5.39004 17.7612 8.8165 17.7612Z' fill='%234CAF50' /%3E%3Cpath d='M17.4612 7.21823H16.7511V7.18164H8.81641V10.7082H13.7989C13.4512 11.6852 12.8249 12.539 11.9973 13.164L11.9987 13.1631L14.7273 15.4721C14.5342 15.6475 17.6327 13.3531 17.6327 8.9449C17.6327 8.35377 17.5719 7.77674 17.4612 7.21823Z' fill='%231976D2' /%3E%3C/svg%3E%0A"
              alt=""
            />
            <span>Continue with Google</span>
          </div>
        </button>
      </div>
      </div>
      

    </div>
  );
}

export default AccountDetails;
