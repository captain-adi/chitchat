import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authToken =
    req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json(new ApiError(401, "No token provided"));
  }
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(new ApiError("Invalid Token", 401));
  }
});

export default authMiddleware;
