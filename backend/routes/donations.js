import express from "express";

import {
  getAllDonations,
  insertDonation,
  updateStatus,
} from "../controllers/donations.js";
const router = express.Router();

router.get("/findall", getAllDonations);
router.post("/insert_donation", insertDonation);
router.post("/update_status", updateStatus);

export default router;
