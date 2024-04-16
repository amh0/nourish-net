// import axios from "axios";
import { createContext, useEffect, useState } from "react";
import perfil from "../components/assets/product_1.jpg";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  console.log(currentUser);
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
    // throw new Error("holaa");
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
