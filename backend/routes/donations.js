import express from "express";

import {
  getAllDonations,
  getAllDonations2,
  insertDonation,
  updateStatus,
  insertReceipt,
  getReceiptData,
  getDonationsGiven,
  getDonationsReceived,
  addToCart,
} from "../controllers/donations.js";
const router = express.Router();

router.get("/findall", getAllDonations2);
router.post("/find_given", getDonationsGiven);
router.post("/find_received", getDonationsReceived);

router.post("/insert_donation", insertDonation);
router.post("/add_to_cart", addToCart);
router.post("/update_status", updateStatus);

router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

export default router;
