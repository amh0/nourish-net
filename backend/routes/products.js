import express from "express";
import { getAllProducts, uploadProducts } from "../controllers/products.js";
const router = express.Router();
router.get("/findall", getAllProducts);
router.get("/upload", uploadProducts);

export default router;
