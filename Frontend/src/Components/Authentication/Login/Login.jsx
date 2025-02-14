import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";
import AnimatedBackground from "../../AnimatedBackground";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    alert("Login Successfully!");
    reset();
  };
  return (
    <div className="w-full flex flex-col items-center sm:justify-center sm:py-2">
      <section className="view sm:w-[45%] w-full rounded-lg flex items-center justify-center p-4 sm:px-3 sm:mt-8 mt-10 sm:mb-0 mb-2">
        
        <div className="form sm:w-[500px] md:w-[600px] sm:h-[80%] w-[98%] rounded-lg">
          <div className="top text-white font-semibold text-xl w-fit ">
            <h1 className="w-fit  font-semibold text-4xl mb-8 sm:mb-5">
              Sign In
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4 rounded-lg px-5 py-2"
            style={{
              boxShadow: '0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Email address</label>
              <div className="relative flex items-center mt-1">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email address"
                  className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                />

                <span className="absolute right-4 text-gray-400">
                  <FaTumblr className="text-gray-400" size={20} />
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Password</label>
              <div className="relative flex items-center mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  placeholder="Enter your password here"
                  className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                />
                <span
                  className="absolute right-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="px-5 py-1 bg-[#5c4cf0] hover:bg-[#6c72c5] font-semibold rounded-full text-center ml-[70%] sm:ml-[80%] cursor-pointer"
            >
              Continue
            </button>
          </form>

          <div className="divider text-white flex items-center justify-center mt-5 sm:mt-5">
            <div className="h-[1px] w-[50%] bg-zinc-400"></div>
            <p>Or</p>
            <div className="h-[1px] w-[50%] bg-zinc-400"></div>
          </div>

          <div className="strategies text-zinc-300 flex flex-col items-center justify-center sm:mt-0 mt-4 sm:py-5 ">
            <span className="w-full">
              <Button />
            </span>
          </div>

        </div>

      </section>
      <AnimatedBackground />
    </div>
  );
}

export default Login;
