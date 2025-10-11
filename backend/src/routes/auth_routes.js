import { Router } from "express";
import {
  signup,
  isLoggedIn,
  logout,
  sendOtp,
  verifyOtp,
} from "../controllers/auth_controller.js";
import authMiddleware from "../middleware/auth_middleware.js";
const router = Router();

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/sign-up").post(signup);
router.route("/logout").post(logout);
router.route("/is-logged-in").get(authMiddleware, isLoggedIn);

export default router;
