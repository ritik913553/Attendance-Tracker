import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Verification_Email_Template,Welcome_Email_Template } from "../utils/EmailTemplate.js";
import { sendEmail } from "../utils/EmailSender.js";
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;
  console.log(req.body);
  if (
    [ email, fullName, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({email})
  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  

  const user = await User.create({
    fullName,
    email,
    password,
    authMethod: 'email',
  });
  
  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  const emailVerifcationToken = createdUser.generateEmailVerificationToken();
  const link = `http://localhost:8000/api/v1/users/verify-email?token=${emailVerifcationToken}`;
  const htmlContent = Verification_Email_Template.replace(
    "{Verification_Link}",
    link
  ).replace("{user_name}", createdUser.fullName);
  await sendEmail(createdUser.email, "Verify your email", htmlContent);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const checkUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "phone number required.");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json(new ApiResponse(409, "User already registered"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "User not found.Procees with otp"));
    }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.EMAIL_VERIFICATION_SECRET
    );

    const user = await User.findByIdAndUpdate(
      decodedToken?._id,
      { $set: { isVerified: true } },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const htmlContent = Welcome_Email_Template.replace(
      "{user_name}",
      user.fullName
    ).replace("[Account Link]", "http://localhost:8000");
    await sendEmail(user.email, "Welcome to Attendance Tracker App", htmlContent);

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Email verified successfully"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  if (email && password) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(404, "User data not exists");
    }

    if(!user.isVerified){
      throw new ApiError(405,"User is not verified")
    }

    if (!user.password) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const ispasswordvalid = await user.isPasswordCorrect(password);

    if (!ispasswordvalid) {
      
      throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "User logged in successfully", {
          loggedInUser,
          accessToken,
          refreshToken,
        })
      );
  }
  res.status(400).json(new ApiResponse(400, "Invalid Login request"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

export { registerUser, loginUser, checkUser, logoutUser ,generateAccessAndRefreshTokens,verifyEmail};
