import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const handleLogin = async (data) => {
    try {
      const success = await login(data);
      if (success) {
        toast.success("Logged in successfully!", { duration: 2000 });
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials", { duration: 2000 });
      }
      reset();
    } catch (error) {
      reset();
    }
  };

  return (
    <div className="w-full flex flex-col items-center sm:justify-center sm:py-2">
      <section className="view sm:w-[80%] w-full rounded-lg flex items-center justify-center p-4 sm:p-0 sm:mt-0 mt-10">
        <div className="form sm:w-[500px] md:w-[600px] sm:h-[80%] w-[98%] rounded-lg">
          <div className="top text-white font-semibold text-xl w-fit">
            <h1 className="w-fit text-3xl font-semibold sm:text-4xl mb-8">
              Sign In
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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

          <div className="divider text-white flex items-center justify-center mt-5">
            <div className="h-[1px] w-[50%] bg-zinc-400"></div>
            <p>Or</p>
            <div className="h-[1px] w-[50%] bg-zinc-400"></div>
          </div>

          <div className="strategies  text-zinc-300 flex flex-col items-center justify-center py-5">
            <span className="w-full">
              <button
                onClick={googleLogin}
                className="btn cursor-pointer strategy flex items-center justify-center gap-5 text-lg border-[1px] border-zinc-400 w-full py-2 rounded-full "
              >
                <img
                  src="data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M17.4612 7.21757H16.751V7.18098H8.81632V10.7075H13.7989C13.072 12.7604 11.1187 14.234 8.81632 14.234C5.89503 14.234 3.52653 11.8655 3.52653 8.94425C3.52653 6.02296 5.89503 3.65446 8.81632 3.65446C10.1648 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1385 0.12793 8.81632 0.12793C3.94751 0.12793 0 4.07544 0 8.94425C0 13.8131 3.94751 17.7606 8.81632 17.7606C13.6851 17.7606 17.6326 13.8131 17.6326 8.94425C17.6326 8.35311 17.5718 7.77609 17.4612 7.21757Z' fill='%23FFC107' /%3E%3Cpath d='M1.0166 4.84069L3.9132 6.96498C4.69697 5.02451 6.59513 3.65446 8.8164 3.65446C10.1649 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1386 0.12793 8.8164 0.12793C5.43005 0.12793 2.49333 2.03975 1.0166 4.84069Z' fill='%23FF3D00' /%3E%3Cpath d='M8.8165 17.7612C11.0938 17.7612 13.1629 16.8897 14.7274 15.4725L11.9988 13.1635C11.0839 13.8593 9.96591 14.2356 8.8165 14.2347C6.52338 14.2347 4.57629 12.7725 3.84278 10.7319L0.967773 12.947C2.42687 15.8022 5.39004 17.7612 8.8165 17.7612Z' fill='%234CAF50' /%3E%3Cpath d='M17.4612 7.21823H16.7511V7.18164H8.81641V10.7082H13.7989C13.4512 11.6852 12.8249 12.539 11.9973 13.164L11.9987 13.1631L14.7273 15.4721C14.5342 15.6475 17.6327 13.3531 17.6327 8.9449C17.6327 8.35377 17.5719 7.77674 17.4612 7.21823Z' fill='%231976D2' /%3E%3C/svg%3E%0A"
                  alt=""
                />
                <span>Continue with Google</span>
              </button>
              {/* Use Link instead of <a> */}
              <Link
                to="/newuser"
                className="create flex items-center justify-center mt-4 w-full p-2 rounded-full border-[1px] border-zinc-400 gap-5 text-lg"
              >
                <span className="text-2xl">
                  <FiUserPlus />
                </span>
                <span>Create a New Account</span>
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
