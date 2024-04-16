import express from "express";
import {
  getVolunteers,
  getNotificationsId,
  sendNotification,
} from "../controllers/users.js";

const router = express.Router();

router.get("/get_volunteers", getVolunteers);
router.post("/get_notifications", getNotificationsId);
router.post("/send_notification", sendNotification);
export default router;
