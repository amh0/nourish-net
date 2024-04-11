// import axios from "axios";
import { createContext, useEffect, useState } from "react";
import perfil from "../components/assets/product_1.jpg";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
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

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/logout"
      );
      console.log(response.data);
      localStorage.removeItem("user");
      setCurrentUser(null);
      // Opcional: redirigir a la página de inicio u otra página después del cierre de sesión
      // history.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aquí podrías manejar el error mostrando un mensaje al usuario o realizando alguna acción adicional
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};
