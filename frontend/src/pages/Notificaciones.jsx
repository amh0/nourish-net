import React from "react";
import "./css/Notificaciones.css";
import NotificationItem from "../components/notificationItem/NotificationItem";
const Notificaciones = () => {
  return (
    <div className="notification">
      <h4 className="title4 ">Notificaciones</h4>
      <div className="item-section">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </div>
  );
};

export default Notificaciones;
