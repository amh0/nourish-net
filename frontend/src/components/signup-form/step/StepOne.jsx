import React, { useState } from "react";
import Switch from "../switch/Switch";
import "./Step.css";

const StepOne = ({ formData, onNext }) => {
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState(formData.password || "");
  const [isOrganization, setIsOrganization] = useState(
    formData.isOrganization || false
  );
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    //validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Verificar si la contraseña tiene al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNext = () => {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError("Correo inválido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      onNext({ email, password, isOrganization });
    }
  };

  return (
    <div className="step">
      <div className="step-one">
        <h2 className="title3">Registro</h2>
        <p className="parr2">Aquí es donde comienza el cambio</p>
        <div>
          <input
            className="input"
            type="email"
            id="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <span className="mensageError">{emailError}</span>
        </div>
        <div>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="input-wrapper">
          <span className="mensageError">{passwordError}</span>
        </div>
        <div className="switch-container">
          <label className="text-option">Representa a una organización</label>
          <Switch
            onChange={(checked) => setIsOrganization(checked)}
            checked={isOrganization}
            id="organization-switch"
          />
        </div>
        <div className="button-wrapper">
          <button className="btn secondary-v" onClick={handleNext}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
