import express from "express";

import {
  getAllDonations,
  updateStatus,
  insertReceipt,
  getReceiptData,
  getDonationProducts,
  addToCart,
  requestDonation,
  removeProduct,
  getDonationsUser,
  getDonationDetails,
  assignVolunteer,
  receiveDonation,
} from "../controllers/donations.js";
const router = express.Router();

router.post("/add_to_cart", addToCart);
router.post("/get_donation_products", getDonationProducts);
router.post("/request_donation", requestDonation);
router.post("/remove_product", removeProduct);
router.post("/get_donation_details", getDonationDetails);

router.post("/update_status", updateStatus);
router.post("/assign_volunteer", assignVolunteer);

router.get("/findall", getAllDonations);
router.post("/find_by_user", getDonationsUser);

router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

router.post("/receive", receiveDonation);

export default router;
