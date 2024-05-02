import express from "express";
import multer from "multer";
import path from "path";
import {
  getResponsables,
  updateUser,
  getVolunteers,
  getNotificationsId,
  sendNotification,
  getNewNotificationsQty,
  readAllNotif,
  readNotif,
  getProdNotAssignedQty,
} from "../controllers/users.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload/img");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.put("/updateUser", upload.single("img"), updateUser);
router.get("/responsables", getResponsables);

router.get("/get_volunteers", getVolunteers);
router.post("/get_notifications", getNotificationsId);
router.post("/get_notifications_qty", getNewNotificationsQty);
router.post("/get_not_assigned_qty", getProdNotAssignedQty);

router.post("/read_notif", readNotif);
router.post("/read_all_notif", readAllNotif);

router.post("/send_notification", sendNotification);

export default router;
