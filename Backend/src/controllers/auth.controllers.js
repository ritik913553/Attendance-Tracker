import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefreshTokens } from "../controllers/user.controler.js";
import { ApiError } from "../utils/ApiError.js";
import { generateOTP } from "../utils/generateOTP.js";

const loginWithGoogle = async (userData, cb) => {
  // TODO :find or create user in database also generate token and sent
  try {
    const userDataConverted = JSON.parse(JSON.stringify(userData));
    const data = userDataConverted._json;
    const { name, email, picture, sub } = data;
    const provider = userDataConverted.provider;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.isVerified = true;
      if (!existingUser.authMethod || existingUser.authId !== sub) {
        existingUser.authMethod = provider;
        existingUser.authId = sub;
        await existingUser.save();
        return cb(null, existingUser);
      }
      await existingUser.save();
      return cb(null, existingUser);
    } else {
      const newUser = await User.create({
        fullName: name,
        email,
        profilePic: picture,
        authMethod: provider,
        authId: sub,
        isVerified: true,
      });
      cb(null, newUser);
    }
  } catch (error) {
    console.error("Error in loginWithGoogle:", error);
    return cb(error);
  }
};

const googleCallback = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }
    const user = req.user;

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    req.logout((err) => {
      if (err) {
        console.error("Error logging out the session:", err);
        return res
          .status(500)
          .json(new ApiResponse(500, "Internal Server Error", null));
      }
      res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options);

      res.redirect("http://localhost:3000");
    });
  } catch (error) {
    console.error("Error in Google Callback:", error);
    res.status(500).json(new ApiResponse(500, "Internal Server Error", null));
  }
});

const googleLoginFailed = (req, res) => {
  // TODO: handle login failed scenario
  res
    .status(400)
    .json(new ApiResponse(400, null, "user authentication failed"));
};

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "User fetched successfully", { loggedInUser: user })
    );
});

const otpForResetPassword = asyncHandler(async (req, res) => {
  // TODO: handle otp request
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.authMethod === "google") {
    throw new ApiError(
      400,
      "Your account is linked with Google. Please reset your password through Google."
    );
  }
  const otp = generateOTP();
  user.resetPasswordOtp = otp;
  await user.save();

  const htmlContent = Reset_Password_OTP_Email_Template.replace(
    "{user_name}",
    user.fullName
  ).replace("{OTP_CODE}", otp);

  await sendEmail(email, "Reset Password OTP", htmlContent);
  return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
});

const resetPassword = asyncHandler(async () => {
  // TODO: handle password reset
  const { email, newPassword, otp } = req.body;
  if (
    [email, otp, newPassword].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.resetPasswordOtp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

export {
  loginWithGoogle,
  googleCallback,
  googleLoginFailed,
  getUser,
  otpForResetPassword,
  resetPassword,
};
