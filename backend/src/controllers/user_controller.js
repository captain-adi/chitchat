import { User } from "../models/user_model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import responseHandler from "../utils/responseHandler.js";
import uploadFileOnCloudinary from "../utils/uploadFileOnCloudinary.js";

const getUser = (req, res) => {
  console.log("Get User Controller");
  res.send("Get User Controller");
};
const deleteUser = (req, res) => {
  console.log("Delete User Controller");
  res.send("Delete User Controller");
};
const updateProfile = asyncHandler(async (req, res) => {
  const { username, about } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (username) {
    user.username = username;
  }
  if (about) user.about = about;
  const avatarUrl = await uploadFileOnCloudinary(req.file.path);
  user.avatar = avatarUrl || user.avatar;
  await user.save();
  responseHandler(res, 200, "Profile updated successfully", user);
  console.log("this is the avatar url : ", avatarUrl);
});
const getAllUser = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user.userId;
  const users = await User.find({ _id: { $ne: loggedInUser } }).select(
    "-emailOtp -otpExpiry -password"
  );
  return responseHandler(res, 200, "All users fetched successfully", users);
});
export { getUser, deleteUser, updateProfile, getAllUser };
