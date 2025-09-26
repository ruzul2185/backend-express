import { Router } from "express";

import { creteNewUser } from "../controllers/userController.js";

const router = Router();

router.post("/", creteNewUser);

export default router;
