import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: String,
    media: String,
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageSchema);
