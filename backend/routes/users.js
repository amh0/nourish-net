import express from "express";
import {
  getVolunteers,
  getNotificationsId,
  sendNotification,
  getNewNotificationsQty,
  readAllNotif,
  readNotif,
  getProdNotAssignedQty,
} from "../controllers/users.js";

const router = express.Router();

router.get("/get_volunteers", getVolunteers);
router.post("/get_notifications", getNotificationsId);
router.post("/get_notifications_qty", getNewNotificationsQty);
router.post("/get_not_assigned_qty", getProdNotAssignedQty);

router.post("/read_notif", readNotif);
router.post("/read_all_notif", readAllNotif);

router.post("/send_notification", sendNotification);

export default router;
