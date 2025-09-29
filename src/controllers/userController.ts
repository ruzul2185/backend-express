import type { Request, Response } from "express";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const creteNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    //     throw new Error("All fields are required");
    // }
    // const newUser = new User({ name, email, password });
    // newUser.save();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // if (!newUser) {
    //   return res.status(400).json({ message: "User is not created" });
    // }
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(500)
        .json({ message: "Validation Error!", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Server Error!", error: String(error) });
  }
};
