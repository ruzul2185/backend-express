import { Router } from "express";
import { Login } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/protection.js";

const router = Router();

router.post("/login", Login);

router.get("/test", isAuthenticated, (req, res) => {
  return res.status(200).json({ message: "Testing complete!" });
});

export default router;
