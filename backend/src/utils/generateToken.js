import asyncHandler from "./AsyncHandler.js";
import jwt from "jsonwebtoken";

const generateToken = asyncHandler((userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
});

export default generateToken;
