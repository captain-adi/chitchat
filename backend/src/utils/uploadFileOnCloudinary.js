import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadFileOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    fs.unlinkSync(filePath);
    return result.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export default uploadFileOnCloudinary;
