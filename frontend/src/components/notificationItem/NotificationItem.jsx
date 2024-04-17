import React from "react";
import ReactTimeAgo from "react-time-ago";
import { HandHeart, Circle } from "@phosphor-icons/react";
import "./NotificationItem.css";
const NotificationItem = (props) => {
  const { notification } = props;
  console.log(notification);
  return (
    <div className="notification-item">
      <HandHeart
        className="icon"
        size={40}
        color="var(--secondary)"
        weight="light"
      />
      <div className="text-section">
        <div className="notification-title parr1 bold">
          {notification.titulo}
        </div>
        <p className="notification-content parr1">{notification.mensaje}</p>
        <div className="notification-time parr2 ">
          <ReactTimeAgo date={Date.parse(notification.fecha)} locale="es" />
        </div>
      </div>
      <Circle className="icon" size={16} color="var(--primary)" weight="fill" />
    </div>
  );
};

export default NotificationItem;
