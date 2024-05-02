import express from "express";
import multer from "multer";
import path from "path";

import {
  verifyEmail,
  login,
  register,
  logout,
  forgotPassword,
  verifyPassword,
  addAdmin,
} from "../controllers/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload/img");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/verifyEmail", verifyEmail);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/logout", logout);
router.post("/verifyPassword", verifyPassword);
router.put("/addAdmin", upload.single("img"), addAdmin);

export default router;
