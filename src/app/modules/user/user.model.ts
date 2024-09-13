import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role is required"],
    default: "user",
  },
  profilePhoto: {
    type: String,
  },
  isDeleted: { type: Boolean, default: false },
});

export const User = model<TUser>("user", userSchema);
