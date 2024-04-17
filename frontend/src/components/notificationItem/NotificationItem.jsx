import React, { useContext } from "react";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {
  HandHeart,
  Circle,
  ArrowsClockwise,
  UserGear,
  Spinner,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import "./NotificationItem.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const apiURL = "http://localhost:3001/api/";

const notifTypes = [
  "Solicitud donacion",
  "Donacion pendiente",
  "Voluntario asignado",
  "Confirmando donacion",
  "Donacion entregada",
  "Donacion rechazada",
  "Donacion cancelada",
];
const iconNames = [
  HandHeart,
  ArrowsClockwise,
  UserGear,
  Spinner,
  CheckCircle,
  XCircle,
  XCircle,
];
const NotificationIcon = (props) => {
  const { notification } = props;
  const notifType = notification.tipo_notif;
  const indexType = notifTypes.findIndex((elem) => elem === notifType);
  const IconElem = indexType >= 0 ? iconNames[indexType] : iconNames[0];
  return (
    <IconElem
      className="icon"
      size={40}
      color={
        indexType === 1 || indexType == 3
          ? "var(--primary)"
          : indexType === 5 || indexType === 6
          ? "var(--tertiary_strong)"
          : "var(--secondary)"
      }
      weight="light"
    />
  );
};
const NotificationItem = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { notificationQty, setNotificationQty } = useContext(AuthContext);
  const { notification } = props;
  const handleRead = async () => {
    console.log("reading notification", notification.idnotif);
    const formData = {
      idNotif: notification.idnotif,
      idUsuario: currentUser.idusuario,
    };
    try {
      await axios.post(apiURL + "users/read_notif", formData);
      console.log("notif read");
      setNotificationQty((prev) => prev - 1);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  return (
    <Link className="link" to={notification.link} onClick={handleRead}>
      <div className="notification-item">
        <NotificationIcon notification={notification} />
        <div className="text-section">
          <div className="notification-title parr1 bold">
            {notification.titulo}
          </div>
          <p className="notification-content parr1">{notification.mensaje}</p>
          <div className="notification-time parr2 ">
            <ReactTimeAgo date={Date.parse(notification.fecha)} locale="es" />
          </div>
        </div>
        {!notification.visto ? (
          <Circle
            className="icon"
            size={16}
            color="var(--tertiary_strong)"
            weight="fill"
          />
        ) : (
          <Circle
            className="icon"
            size={16}
            color="var(--background0)"
            weight="fill"
          />
        )}
      </div>
    </Link>
  );
};

export default NotificationItem;
