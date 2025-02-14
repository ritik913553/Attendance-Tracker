import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefreshTokens } from "../controllers/user.controler.js";

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
          .json(new ApiResponse(500, "Internal Server Error",null));
      }
      res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        
        res.redirect("http://localhost:3000")
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
  res.json(new ApiResponse(200, "User retrieved successfully", user));
});

export { loginWithGoogle, googleCallback, googleLoginFailed, getUser };
