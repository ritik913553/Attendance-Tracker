import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  //res ka use nhi ho rha tha isliye res ke jagha  _  lga diye
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const refreshToken = req.cookies?.refreshToken;
    
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password +refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    console.log("Refresh B",refreshToken)
    console.log("Refresh D",user.refreshToken)

    if (user.refreshToken != refreshToken) {
      res.clearCookie('accessToken').clearCookie('refreshToken'); // Remove invalid token
      throw new ApiError(401, "Session expired Please Login again!");
    }
    const loggedInUser = await User.findById(user._id);
    req.user = loggedInUser;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
