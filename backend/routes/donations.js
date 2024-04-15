import express from "express";

import {
  getAllDonations,
  updateStatus,
  insertReceipt,
  getReceiptData,
  getDonationsGiven,
  getDonationsReceived,
  getDonationProducts,
  addToCart,
  requestDonation,
  removeProduct,
  getDonationsUser,
  getDonationDetails,
  assignVolunteer,
} from "../controllers/donations.js";
const router = express.Router();

router.post("/add_to_cart", addToCart);
router.post("/get_donation_products", getDonationProducts);
router.post("/request_donation", requestDonation);
router.post("/remove_product", removeProduct);
router.post("/get_donation_details", getDonationDetails);

// router.post("/insert_donation", insertDonation);
router.post("/update_status", updateStatus);
router.post("/assign_volunteer", assignVolunteer);

router.get("/findall", getAllDonations);
router.post("/find_by_user", getDonationsUser);
// router.post("/find_given", getDonationsGiven);
// router.post("/find_received", getDonationsReceived);

router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

export default router;
