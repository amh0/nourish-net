import express from "express";
import multer from "multer";
import path from "path";

import {
  getAllProductsNoFunctions,
  getAllProducts,
  uploadProduct,
  getCategories,
  getCategoriesProdX,
  getDonnor,
  updateEvaluation,
} from "../controllers/products.js";
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

router.get("/findall", getAllProducts);
router.post("/upload", upload.single("img"), uploadProduct);
router.get("/findcategories", getCategories);
router.post("/categories_prod", getCategoriesProdX);
router.post("/find_donnor", getDonnor);

router.post("/update_eval", updateEvaluation);

export default router;
