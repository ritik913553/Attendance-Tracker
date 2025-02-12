import React, { useState } from "react";
import Button from "../../Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // Track phone number input
  const [showOTP, setShowOTP] = useState(false); // Track OTP div visibility
  const [showEmailLogin, setShowEmailLogin] = useState(false); // Track Email Login
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Track OTP input

  // Function to handle phone number change
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
    if (value.length === 10) {
      setShowOTP(true);
    }
  };
  // for submiting email information 
  const handleloginAccount = () => {
    if(!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    alert("Login Successfully!");
    setemail("");
    setpassword("");
  }
  // track otp
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    // Automatically focus next input when current input is filled
    if (newOtp[index] !== "" && index < 3) {
      document.getElementById(`digit${index + 2}`).focus();
    }
  };
  return (
    <div className="w-full flex flex-col items-center sm:justify-center sm:py-2">
      <section className="view sm:w-[80%] w-full rounded-lg flex items-center justify-center p-4 sm:p-0 sm:mt-0 mt-10">
        <div className="form sm:w-[500px] md:w-[600px] sm:h-[80%] w-[98%] rounded-lg">
          <div className="top text-white font-semibold text-xl w-fit">
            <h1 className="w-fit text-3xl font-semibold sm:text-4xl">Sign In</h1>
            <div className="flex gap-5 mt-3 w-fit text-zinc-400 cursor-pointer">
              <p
                className={`text-lg font-semibold ${!showEmailLogin ? "text-white" : ""}`}
                onClick={() => setShowEmailLogin(false)}
              >
                Phone
              </p>
              <p
                className={`text-lg font-semibold ${showEmailLogin ? "text-white" : ""}`}
                onClick={() => {
                  setShowEmailLogin(true);
                  setShowOTP(false);
                  setPhoneNumber("");
                }}
              >
                Email
              </p>
            </div>
          </div>

          <div className="bottom">
            {!showEmailLogin ? (
              <div className="mobile-number w-full mt-3 text-white">
                {!showOTP ? (
                  // Phone Number Input
                  <div className="py-5">
                    <label className="font-semibold text-zinc-400">Mobile Number*</label>
                    <div className="bg-[#1E1E1E] mt-2 text-white">
                      <input
                        className="w-full text-lg px-3 shadow-md border-b-1 border-zinc-500 placeholder-gray-400 outline-none"
                        type="tel"
                        name="phone"
                        placeholder="Enter Your Mobile Number"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                ) : (
                  // OTP Verification
                  <div id="otp-verification" className="details flex flex-col items-center justify-center py-2">
                    <h2 className="w-full text-center text-lg sm:text-2xl font-semibold mb-2">
                      OTP Verification
                    </h2>
                    <div className="inputfield">
                      <label className="text-sm text-zinc-400">
                        Enter the OTP sent to +91 -{" "}
                        <span id="otp-mobile-number" className="text-white">
                          {phoneNumber}
                        </span>
                        <i
                          className="ri-pencil-line text-white underline cursor-pointer"
                          onClick={() => {
                            setShowOTP(false);
                            setPhoneNumber("");
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
                          inputmode="numeric"
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
                      <span id="resend-otp-text" className="cursor-pointer">
                        Resend OTP
                      </span>{" "}
                      <span className="timer"></span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Email Login
              <div className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Email address</label>
                  <div className="relative flex items-center mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-[#1E1E1E] text-white px-4 py-3 rounded-md outline-none border border-transparent focus:border-gray-500"
                    />
                    <span className="absolute right-4 text-gray-400">
                      <FaTumblr className="text-gray-400" size={20} />
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Password</label>
                  <div className="relative flex items-center mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="Enter your password here"
                      className="w-full bg-[#1E1E1E] text-white px-4 py-3 rounded-md outline-none border border-transparent focus:border-gray-500"
                    />
                    <span
                      className="absolute right-4 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                 onClick={handleloginAccount}
                 className="px-5 py-1 bg-[#24CFA6] text-zinc-900 font-semibold rounded-full hover:bg-[#7ee7cf] text-center ml-[70%] sm:ml-[80%] cursor-pointer">
                  Continue
                </button>
              </div>
            )}

            <div className="divider text-white flex items-center justify-center py-5">
              <div className="h-[1px] w-[45%] bg-zinc-400"></div>
              <p>Or</p>
              <div className="h-[1px] w-[50%] bg-zinc-400"></div>
            </div>

            <div className="strategies text-zinc-300 flex flex-col items-center justify-center py-5">
              <span className="w-full">
                <Button />
              </span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
