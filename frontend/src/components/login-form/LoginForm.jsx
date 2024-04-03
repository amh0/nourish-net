import React, { useContext, useState } from "react";
import Input from "../input/Input";
import axios from "axios";
import Alimentos from "../../pages/Alimentos";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { AuthContext } from "../../context/authContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensageErrorEmail, setMensageErrorEmail] = useState("");
  const [mensageErrorPassword, setMensageErrorPassword] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const authenticateUser = async (e) => {
    e.preventDefault();
    setMensageErrorEmail("");
    setMensageErrorPassword("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log("ERROR", err.message);
      if (err.message === "incorrectPassword") {
        setMensageErrorPassword("Contraseña incorrecta");
        console.log("Incorrect password");
      } else if (err.message === "emailNotFound") {
        setMensageErrorEmail("Correo no registrado");
        console.log("Email not found");
      }
      console.log(err);
    }

    // setMensageErrorEmail("");
    // setMensageErrorPassword("");
    // axios
    //   .post("http://localhost:3001/api/auth/login", {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     const verificationResult = response.data.verificationResult;
    //     if (verificationResult === "correct") {
    //       console.log("Email and password are correct");
    //       setAuthenticated(true);
    //     } else if (verificationResult === "incorrectPassword") {
    //       setMensageErrorPassword("Contraseña incorrecta");
    //       console.log("Incorrect password");
    //     } else if (verificationResult === "emailNotFound") {
    //       setMensageErrorEmail("Correo no registrado");
    //       console.log("Email not found");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("correo invalido: ", email);
    //     setMensageErrorEmail("Correo inválido");
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <div className="signup-container">
        <div className="rectangle-container"></div>
        <div className="step">
          <h2>Inicia Sesión</h2>
          <p className="marginBottom">Ingresa tus credenciales</p>
          <div className="btn-margin-bottom">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
            />
            <div className="mensageError">
              <span>{mensageErrorEmail}</span>
            </div>
          </div>

          <div className="btn-margin-bottom">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <div className="mensageError">
              <span>{mensageErrorPassword}</span>
            </div>
          </div>
          <Link className="link-color" to="/loginHelp">
            <p>¿Olvidaste tu contraseña?</p>
          </Link>

          <div className="button-wrapper">
            <button
              className="btn secondary-v custom-button"
              onClick={authenticateUser}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
