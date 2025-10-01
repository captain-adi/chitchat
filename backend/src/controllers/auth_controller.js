import asyncHandler from "../utils/AsyncHandler.js";

const signup = asyncHandler(async (req, res, next) => {
  res.send("User signed up successfully");
});
const login = asyncHandler(async (req, res, next) => {
  res.send("User logged in successfully");
});
const logout = asyncHandler(async (req, res, next) => {
  res.send("User logged out successfully");
});
const isLoggedIn = asyncHandler(async (req, res, next) => {
  res.send("User is logged in");
});

export { signup, login, logout, isLoggedIn };
