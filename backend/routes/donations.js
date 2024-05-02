import express from "express";

import {
  getAllDonations,
  updateStatus,
  updateDeliveryStatus,
  insertReceipt,
  getReceiptData,
  getDonationProducts,
  addToCart,
  requestDonation,
  removeProduct,
  getDonationsUser,
  getDonationDetails,
  assignVolunteer,
  getDeliveryProducts,
  insertDeliveryDonation,
} from "../controllers/donations.js";
const router = express.Router();

router.post("/add_to_cart", addToCart);
router.post("/get_donation_products", getDonationProducts);
router.post("/request_donation", requestDonation);
router.post("/remove_product", removeProduct);
router.post("/get_donation_details", getDonationDetails);

router.post("/update_status", updateStatus);
router.post("/update_delivery_status", updateDeliveryStatus);
router.post("/assign_volunteer", assignVolunteer);

router.get("/findall", getAllDonations);
router.post("/find_by_user", getDonationsUser);

router.post("/insert_receipt", insertReceipt);
router.post("/find_receipt", getReceiptData);

// donar alimentos
router.post("/get_delivery_products", getDeliveryProducts);
router.post("/insert_delivery_donation", insertDeliveryDonation);


export default router;
