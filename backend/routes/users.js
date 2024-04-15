import express from "express";
import { getVolunteers } from "../controllers/users.js";

const router = express.Router();

router.get("/get_volunteers", getVolunteers);
export default router;
