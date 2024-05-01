import express from "express";
import multer from "multer";
import path from "path";
import { getResponsables, updateUser } from "../controllers/users.js";

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

router.put("/updateUser", upload.single("img"), updateUser);
router.get("/responsables", getResponsables);

export default router;
