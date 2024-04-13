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
  getDonationProducts,
  addToCart,
  requestDonation,
} from "../controllers/donations.js";
const router = express.Router();

router.get("/findall", getAllDonations2);
router.post("/find_given", getDonationsGiven);
router.post("/find_received", getDonationsReceived);

router.post("/insert_donation", insertDonation);
router.post("/update_status", updateStatus);

router.post("/add_to_cart", addToCart);
router.post("/get_donation_products", getDonationProducts);
router.post("/request_donation", requestDonation);

router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

export default router;
