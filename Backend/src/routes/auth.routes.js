import { Router } from "express";

import passport from "../middlewares/passport.middleware.js";
import {
  googleCallback,
  googleLoginFailed,
  getUser,
  otpForResetPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router
  .route("/login-with-google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/login-with-google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login-with-google/failed",
  }),
  googleCallback
);

router.route("/login-with-google/failed").get(googleLoginFailed);

router.route("/me").get(verifyJWT, getUser);

router.route("/reset-password").post(resetPassword);
router.route("/request-otp").post(otpForResetPassword);

export default router;
