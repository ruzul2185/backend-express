import type { Request, Response } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password are required!");
    }
    const getUser = await User.findOne({ email });
    if (!getUser) {
      throw new Error("User does not exists!");
    }
    const hashCheck = await bcrypt.compare(password, getUser.password);
    if (!hashCheck) {
      throw new Error("Email or Password is incorrect!");
    }
    const payload = {
      id: getUser._id,
      email: getUser.email,
    };
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("Access Token is missing!");
    }
    const accessToken = jsonwebtoken.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ payload, accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error!", error: String(error) });
  }
};
