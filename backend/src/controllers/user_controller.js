import { User } from "../models/user_model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
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
  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", user));
  console.log("this is the avatar url : ", avatarUrl);
});
export { getUser, deleteUser, updateProfile };
