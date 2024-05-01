import express from "express";
import multer from "multer";
import path from "path";

import {
  addResponsable,
  deleteResponsable,
  editAdmin,
  editFood,
  editResponsable,
  getAdmins,
  getFoodx,
  getUserx,
  editUser,
} from "../controllers/edit.js";
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

router.put("/editResponsable", editResponsable);
router.delete("/deleteResponsable", deleteResponsable);
router.post("/addResponsable", addResponsable);
//ADMIN
router.get("/getAdmins", getAdmins);
router.put("/editAdmin", editAdmin);
//ALIMENTOS
router.get("/getFoodx", getFoodx);
router.put("/editFood", upload.single("img"), editFood);
//USUARIO
router.get("/getUserx", getUserx);
router.put("/editUser", upload.single("img"), editUser);
export default router;
