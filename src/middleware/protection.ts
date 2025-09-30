import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = req.headers?.authorization;
    const token = value?.split(" ")[1];
    if (!token || !process.env.ACCESS_TOKEN_SECRET) {
      return res.status(403).json("Forbidden");
    }
    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(String(error));
  }
};
