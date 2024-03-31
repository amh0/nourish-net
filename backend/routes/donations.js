import express from "express";

import { getAllDonations, insertDonation } from "../controllers/donations.js";
const router = express.Router();

router.get("/findall", getAllDonations);
router.post("/insert_donation", insertDonation);

export default router;
