import express from "express";
import {
  verifyEmail,
  login,
  register,
  logout,
  forgotPassword,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/verifyEmail", verifyEmail);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/logout", logout);

export default router;
