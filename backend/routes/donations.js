import express from "express";

import { insertDonation } from "../controllers/donations.js";
const router = express.Router();

router.post("/insert_donation", insertDonation);

export default router;
