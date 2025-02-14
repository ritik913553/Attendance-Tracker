import { Router } from "express";
import {
  registerUser,
  loginUser,
  checkUser,
  logoutUser,
  verifyEmail
} from "../controllers/user.controler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route('/verify-email').get(verifyEmail)
router.route("/signup/check-user").post(checkUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
