import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // validation rule
    minlength: [3, "Name must be at least 3 characters long"], // validation rule
  },
  email: {
    type: String,
    unique: true, // unique index
    required: [true, "Email is required"], // validation rule
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // validation rule
  },
  password: {
    type: String,
    required: [true, "Password is required"], // validation rule
    minlength: [6, "Password must be at least 6 characters long"], // validation rule
  },
});

export const User = model("2Users", userSchema);
