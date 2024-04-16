import React from "react";
import { HandHeart, Circle } from "@phosphor-icons/react";
import "./NotificationItem.css";
const NotificationItem = (props) => {
  const { notification } = props;
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
          Tu donación fue aceptada
        </div>
        <p className="notification-content parr1">
          Un administrador realizó la aprobación de tu donación revisa los
          detalles en la sección de donaciones.
        </p>
        <div className="notification-time parr2 ">Hace 24 minutos.</div>
      </div>
      <Circle className="icon" size={16} color="var(--primary)" weight="fill" />
    </div>
  );
};

export default NotificationItem;
