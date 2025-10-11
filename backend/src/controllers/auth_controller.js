import { User } from "../models/user_model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import bcrypt from "bcrypt";
import otpGenerator from "../utils/otpGenerator.js";
import {} from "twilio";
import { sendOtpToPhoneNumber, verifyOTP } from "../services/twilioService.js";
import { sendOTPtoMail } from "../services/emailService.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

const options = {
  httpOnly: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  secure: process.env.NODE_ENV === "production",
  samesite: false,
};

const sendOtp = asyncHandler(async (req, res, next) => {
  const { phoneNumber, email, phoneSuffix } = req.body;
  const OTP = otpGenerator();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
  let user;
  try {
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        user = new User({ email });
      }
      user.emailOtp = OTP;
      user.otpExpiry = otpExpiry;
      await user.save();
      sendOTPtoMail(OTP, email);
      return res
        .status(200)
        .json(new ApiResponse(200, "Check your email for OTP", email));
    }
    if (!phoneNumber && !phoneSuffix) {
      throw new ApiError(" phone number and phone suffix is required ");
    }
    const fullPhoneNumber = `+${phoneSuffix}${phoneNumber}`;

    user = await User.findOne({ phoneNumber, phoneSuffix });
    if (!user) {
      user = new User({ phoneNumber, phoneSuffix });
    }
    await sendOtpToPhoneNumber(fullPhoneNumber);
    await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Check your message for OTP", fullPhoneNumber)
      );
  } catch (error) {
    next(error);
  }
});

const verifyOtp = asyncHandler(async (req, res, next) => {
  const { phoneNumber, email, otp, phoneSuffix } = req.body;
  const query = email ? { email } : { phoneNumber, phoneSuffix };
  const user = await User.findOne(query);
  if (!user) {
    return res.status(400).json(new ApiResponse(400, "User not found", null));
  }
  if (email) {
    if (user.emailOtp !== otp || user.otpExpiry < new Date()) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid or expired OTP", null));
    }
    user.emailOtp = null;
    user.otpExpiry = null;
    user.isVerified = true;
  }
  if (phoneNumber) {
    const fullPhoneNumber = `+${phoneSuffix}${phoneNumber}`;
    const isOTPVerifired = await verifyOTP(fullPhoneNumber, otp);
    if (!isOTPVerifired) {
      return res.status(401).json(new ApiResponse(401, "Invalid OTP", null));
    }
    user.isVerified = true;
  }
  await user.save();
  const token = generateToken(user._id);
  res.cookie("token", token, options);
  const safeUser = {
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    isVerified: user.isVerified,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, "OTP verified successfully", safeUser));
});

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json(new ApiResponse(400, "User already exists", null));
    return;
  }
  console.log(password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(200).json(new ApiResponse(200, "signup successful", newUser));
});

const logout = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, "Logout successful", { userId }));
});
const isLoggedIn = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiError("User not found", 404));
  }
  res.status(200).json(new ApiResponse(200, "User is logged in", user));
});

export { signup, logout, isLoggedIn, sendOtp, verifyOtp };
