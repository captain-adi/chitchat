import { Router } from "express";
import {
  signup,
  login,
  isLoggedIn,
  logout,
  sendOtp,
  verifyOtp,
} from "../controllers/auth_controller.js";
const router = Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/sign-up").post(signup);
router.route("/sign-in").post(login);
router.route("/logout").post(logout);
router.route("/is-logged-in").get(isLoggedIn);

export default router;
