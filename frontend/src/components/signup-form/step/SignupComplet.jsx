import React, { useContext } from "react";
import "./Step.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

const SignupComplet = ({ formData }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginAfterRegister = async () => {
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión automáticamente:", err);
    }
  };

  return (
    <div className="step">
      <h2>Registro completado</h2>
      <p className="marginBottom">Ahora eres parte de nuestra red solidaria</p>
      <div className="button-wrapper">
        <button
          className="btn secondary-v custom-button2"
          onClick={handleLoginAfterRegister}
        >
          Comienza ahora
        </button>
      </div>
    </div>
  );
};

export default SignupComplet;
