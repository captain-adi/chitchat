import ApiResponse from "./ApiResponse.js";

const responseHandler = (res, statusCode, message, data = null) => {
  if (!res) {
    throw new Error("Response object is required");
    return;
  }
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data));
};
export default responseHandler;
