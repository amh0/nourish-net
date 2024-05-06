import express from "express";
import multer from "multer";
import path from "path";

import { getPeticiones, uploadPeticion } from "../controllers/peticiones.js";
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

router.get("/get-peticiones", getPeticiones);
router.post("/upload-peticion", upload.single("img"), uploadPeticion);
// router.post("/insert_donation", insertDonation);

export default router;
