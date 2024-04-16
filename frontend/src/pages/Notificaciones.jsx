import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import NotificationItem from "../components/notificationItem/NotificationItem";
import "./css/Notificaciones.css";

const apiURL = "http://localhost:3001/api/";

const Notificaciones = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const result = await axios.post(apiURL + "users/get_notifications", {
        idUsuario: currentUser.idusuario,
      });
      setNotifications(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  return (
    <div className="notification">
      <h4 className="title4 ">Notificaciones</h4>
      <div className="item-section">
        {notifications.map((notif) => {
          return <NotificationItem key={notif.idnotif} notification={notif} />;
        })}
      </div>
    </div>
  );
};

export default Notificaciones;
