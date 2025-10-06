import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    phoneSuffix: {
      type: String,
      unique: false,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    emailOtp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
    },
    online: {
      type: Boolean,
      default: false,
    },
    lastSeen: { type: Date },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const User = mongoose.model("User", userSchema);
