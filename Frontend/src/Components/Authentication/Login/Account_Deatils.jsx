import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";

function Account_Deatils() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [showOTP, setShowOTP] = useState(false); // Track OTP div visibility
    const [phone, setphone] = useState(""); 
    const [otp, setOtp] = useState(["", "", "", ""]); // Track OTP input
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      

    const handlePhoneChange = (e) => {
      const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setphone(value);
    }
    if (value.length === 10) {
      setShowOTP(true);
    }
    };
    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
    
        // Automatically focus next input when current input is filled
        if (newOtp[index] !== "" && index < 3) {
          document.getElementById(`digit${index + 2}`).focus();
        }
    
        // Move to next step when OTP is fully filled
        if (newOtp.every((digit) => digit !== "")) {
          setStep(3); 
        }
    };

    const handleCreateAccount = ()=> {
      if(!name || !email || !password){
        alert("Please fill all the fields");
        return;
      } 
      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    }

    useEffect(() => {
        // Automatically move to OTP step when phone number has been entered
        if (phone.length === 10) {
          setStep(2); 
        }
    }, [phone]);

  return (
    <div className="w-full h-full flex flex-col sm:items-center px-3 sm:px-0 text-white">
      <div className="w-full flex flex-col sm:items-center sm:mr-[230px] mt-10 sm:mt-8">
        <h1 className="text-4xl font-semibold mb-1 text-white sm:mr-[70px]">
          Sign Up
        </h1>
        <div className="flex items-center text-zinc-400">
          <p className="text-sm">Already have an account?</p>
          <Link
            onClick={() => navigate(-1)}
            className="text-sm ml-[2px] text-blue-600"
          >
            Sign in
          </Link>
        </div>
      </div>

      <div className="px-1 py-2">
        {/* Step Indicator */}
        <div className="flex items-center sm:gap-20 gap-6 mb-8 py-5 mt-5 sm:px-10">
          {["Enter_Number", "Verify_OTP", "Define_User_Info"].map(
            (label, index) => (
              
              <div key={index} className="w-full flex flex-col items-center">
                <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    step >= index + 1
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                  }`}
                ></div>
                </div>
                <span
                  className={`text-sm mt-2 ${
                    step >= index + 1 ? "text-white" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          )}
        </div>

        {/* Main Content */}
        <div className="bg-[#121212] p-6 shadow-lg w-full min-h-[100px] flex flex-col justify-center">
          {/* Enter Number */}
          {step === 1 && (
            <div>
              <label className="text-zinc-400 text-lg mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handlePhoneChange} // Track input change
                placeholder="Enter Your Mobile Number"
                maxLength="10"
                inputMode="numeric"
                className="w-full px-4 py-2 rounded bg-[#1E1E1E] border border-[#1E1E1E] outline-none text-zinc-300"
              />
            </div>
          )}

          {/* OTP Verification */}
          {(step === 2 && showOTP) && (
            <div>
              <label className="block mb-2 text-lg"></label>
              <div
                id="otp-verification"
                className="details  flex flex-col items-center justify-center py-2"
              >
                <div className="loader-container">
                  <div className="loader">
                    <div className="progress" id="progress"></div>
                  </div>
                </div>
                <h2 className=" w-full text-center text-lg sm:text-2xl font-semibold mb-2">
                  OTP Verification
                </h2>
                <div className="inputfield ">
                  <label className="text-sm text-zinc-400">
                  Enter the OTP sent to +91 -{" "}
                    <span id="otp-mobile-number" className="text-white">
                      {phone}
                    </span>
                    <i className="ri-pencil-line text-white underline cursor-pointer"
                    onClick={()=>{
                      setShowOTP(false);
                      setStep(1);
                    }}
                    >
                      <span className="ml-[1px]">Edit</span>
                    </i>
                  </label>
                </div>

                <div className="otp-container flex gap-2 mt-2 mb-2 text-zinc-400">
                    {otp.map((digit, index) => (
                    <input
                      key={index}
                      inputMode="numeric"
                      autocomplete="off"
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="otp-input w-10 h-10 rounded text-lg text-center border-1"
                      id={`digit${index + 1}`}
                    />
                    ))}

                </div>

                <p id="otpErrorMessage" className="text-red-400 text-sm">
                  Invalid OTP
                </p>
                <p id="resend-otp" className="w-full text-center">
                  <span id="resend-otp-text" className="cursor-pointer  ">
                    Resend OTP
                  </span>{" "}
                  <span className="timer"></span>
                </p>
              </div>
            </div>
          )}
          {/* User Details */}
          {step === 3 && (
            <div>
              {/* Name */}
              <div className="inputfield flex flex-col">
                <label className="text-gray-300 text-sm">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Email address</label>
                <div className="relative flex items-center mt-1">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                  <span className="absolute right-4 text-gray-400">
                    <FaTumblr className="text-gray-400" size={20} />
                  </span>
                </div>
              </div>
              {/* Password */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Password</label>
                <div className="relative flex items-center mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password here"
                    className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                  />
                  <span
                    className="absolute right-4 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </span>
                </div>
              </div>
              {/* Button Create Account */}
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={handleCreateAccount}
                 className="w-full px-10 py-1 rounded bg-[#24CFA6] hover:bg-[#63ac9b] text-black cursor-pointer">
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="divider text-white flex items-center justify-center py-5">
              <div className="h-[1px] w-[45%] bg-zinc-400"></div>
              <p>Or</p>
              <div className="h-[1px] w-[50%] bg-zinc-400"></div>
        </div>
        {/* google */}
        <span className="inline-block w-full mt-5">
          <a
            href="/signIn/google"
            className="btn strategy flex items-center justify-center gap-5 text-lg border-[1px] border-zinc-400 w-full py-2 rounded-full "
          >
            <img
              src="data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M17.4612 7.21757H16.751V7.18098H8.81632V10.7075H13.7989C13.072 12.7604 11.1187 14.234 8.81632 14.234C5.89503 14.234 3.52653 11.8655 3.52653 8.94425C3.52653 6.02296 5.89503 3.65446 8.81632 3.65446C10.1648 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1385 0.12793 8.81632 0.12793C3.94751 0.12793 0 4.07544 0 8.94425C0 13.8131 3.94751 17.7606 8.81632 17.7606C13.6851 17.7606 17.6326 13.8131 17.6326 8.94425C17.6326 8.35311 17.5718 7.77609 17.4612 7.21757Z' fill='%23FFC107' /%3E%3Cpath d='M1.0166 4.84069L3.9132 6.96498C4.69697 5.02451 6.59513 3.65446 8.8164 3.65446C10.1649 3.65446 11.3916 4.16316 12.3257 4.9941L14.8194 2.5004C13.2448 1.03292 11.1386 0.12793 8.8164 0.12793C5.43005 0.12793 2.49333 2.03975 1.0166 4.84069Z' fill='%23FF3D00' /%3E%3Cpath d='M8.8165 17.7612C11.0938 17.7612 13.1629 16.8897 14.7274 15.4725L11.9988 13.1635C11.0839 13.8593 9.96591 14.2356 8.8165 14.2347C6.52338 14.2347 4.57629 12.7725 3.84278 10.7319L0.967773 12.947C2.42687 15.8022 5.39004 17.7612 8.8165 17.7612Z' fill='%234CAF50' /%3E%3Cpath d='M17.4612 7.21823H16.7511V7.18164H8.81641V10.7082H13.7989C13.4512 11.6852 12.8249 12.539 11.9973 13.164L11.9987 13.1631L14.7273 15.4721C14.5342 15.6475 17.6327 13.3531 17.6327 8.9449C17.6327 8.35377 17.5719 7.77674 17.4612 7.21823Z' fill='%231976D2' /%3E%3C/svg%3E%0A"
              alt=""
            />
            <span>Continue with Google</span>
          </a>
        </span>

      </div>
      
    </div>
  );
}

export default Account_Deatils;

