import asyncHandler from "../utils/AsyncHandler.js";

const getUser = (req, res) => {
  console.log("Get User Controller");
  res.send("Get User Controller");
};
const deleteUser = (req, res) => {
  console.log("Delete User Controller");
  res.send("Delete User Controller");
};
const updateProfile = asyncHandler(async (req, res) => {
  res.send("updated user profile");
});
export { getUser, deleteUser, updateProfile };
