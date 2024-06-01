import express from "express";
import multer from "multer";
import path from "path";

import { allCategories, allFood, categoryX } from "../controllers/chatbot.js";
const router = express.Router();
router.get("/get-all-categories", allCategories);
router.get("/get-all-food", allFood);
router.get("/get-categoryx", categoryX);

export default router;
