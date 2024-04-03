import React, { useContext } from "react";
import "../signup-form/step/Step.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";


const OperationComplete = ({ title, description, link, buttonText, formData }) => {
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
      <h2>{title}</h2>
      <p className="marginBottom">{description}</p>
      <div className="button-wrapper">
        <button
          className="btn secondary-v custom-button2"
          onClick={handleLoginAfterRegister}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OperationComplete;
