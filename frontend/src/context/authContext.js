// import axios from "axios";
import { createContext, useEffect, useState } from "react";
import perfil from "../components/assets/product_1.jpg";
import axios from "axios";

export const AuthContext = createContext();

const apiURL = "http://localhost:3001/api/";

export const AuthContextProvider = ({ children }) => {
  const [notificationQty, setNotificationQty] = useState(0);
  const [uploadedQty, setUploadedQty] = useState(0);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    //TO DO
    // setCurrentUser({
    //   idusuario: "123",
    //   correo: "123@gmail.com",
    //   img_perfil: perfil,
    // });

    const res = await axios.post(
      "http://localhost:3001/api/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    const verificationResult = res.data.verificationResult;
    if (verificationResult === "incorrectPassword") {
      throw new Error("incorrectPassword");
    } else if (verificationResult === "emailNotFound") {
      throw new Error("emailNotFound");
    }
    console.log("requesting user");
    // throw new Error("holaa");
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const fetchUploaded = async () => {
      try {
        const result = await axios.post(apiURL + "users/get_not_assigned_qty", {
          idUsuario: currentUser.idusuario,
        });
        setUploadedQty(result.data[0].uploadedQty);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUploaded();
  }, [currentUser]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await axios.post(
          apiURL + "users/get_notifications_qty",
          {
            idUsuario: currentUser.idusuario,
          }
        );
        setNotificationQty(result.data[0].newNotifQty);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [currentUser]);
  // useEffect(() => {
  //   localStorage.setItem("notificationQty", JSON.stringify(notificationQty));
  //   console.log(localStorage);
  // }, [notificationQty]);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        setCurrentUser,
        notificationQty,
        setNotificationQty,
        uploadedQty,
        setUploadedQty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
