import express from "express";

import {
  getAllDonations,
  insertDonation,
  updateStatus,
  insertReceipt,
  getReceiptData,
} from "../controllers/donations.js";
const router = express.Router();

router.get("/findall", getAllDonations);
router.post("/insert_donation", insertDonation);
router.post("/update_status", updateStatus);
router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

export default router;
