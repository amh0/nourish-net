import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { CheckCircle } from "phosphor-react";
import { EnvelopeSimple } from "phosphor-react";
import Input from "../input/Input";
//ENCRIPTAR LA CONTRASENIA
import CryptoJS from "crypto-js";

const PasswordForm = ({ formData, title, description, onBack, onNext }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  const handleNext = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
    } else if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError("");
      // encryptCode();
      onNext({ password });
    }
  };

  // const encryptCode = () => {
  //   const encPassword = CryptoJS.AES.encrypt(password, "key").toString();
  //   onNext({ encPassword });
  // };

  return (
    <div>
      <h2>{title}</h2>
      <div className="align">
        <CheckCircle size={20} color="var(--textlight)" />
        <p>Verificación de código realizada con exito</p>
      </div>

      <div className="margin-bottom-align">
        <EnvelopeSimple size={21} color="var(--textlight)" />
        <span className="underline">{formData.email}</span>
      </div>
      <p className="margin-bottom-align">{description}</p>
      <div className="marginBottom">
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
      </div>
      <div>
        <Input
          id="confPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
        />
      </div>
      <div className="mensageError">
        <span>{passwordError}</span>
      </div>

      <div className="button-wrapper">
        <button className="btn grey-v custom-btn-grey" onClick={onBack}>
          <ArrowLeft size={30} color="var(--background1)" />
        </button>
        <button className="btn secondary-v custom-button" onClick={handleNext}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
