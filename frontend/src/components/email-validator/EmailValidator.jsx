import React, { useState } from "react";
import Input from "../input/Input";
import axios from "axios";

const EmailValidator = ({
  formData,
  title,
  description,
  buttonText,
  existsInDB,
  onNext,
}) => {
  const [email, setEmail] = useState(formData.email || "");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    return true;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return emailRegex.test(email);
  };

  const handleNext = () => {
    if (email === "") {
      setEmailError("Ingrese un correo");
    } else if (!validateEmail(email)) {
      setEmailError("Correo inválido");
    } else {
      setEmailError("");
      sendCode();
    }
  };

  const sendCode = () => {
    axios
      .post("http://localhost:3001/api/auth/verifyEmail", {
        email,
        existsInDB: existsInDB,
      })
      .then((response) => {
        if (response.status === 200) {
          onNext({ email, verificationCode: response.data.verificationCode });
          setEmailError("Código enviado al correo");
          console.log("Email sent successfully.");
        } else if (response.status === 204) {
          if (existsInDB === 0) {
            setEmailError("El correo ya está registrado");
          } else {
            setEmailError("El correo no está registrado");
          }
        } else {
          setEmailError("Error al enviar código ");
        }
      })
      .catch((error) => {
        console.log("correo invalido: ", email);
        setEmailError("Correo inválido");
        console.error("Error sending verification code:", error);
      });
  };

  return (
    <div className="step">
      <h2>{title}</h2>
      <div className="marginBottom">
        <p>{description}</p>
      </div>
      <div>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
        />
      </div>
      <div className="mensageError">
        <span>{emailError}</span>
      </div>
      <div className="button-wrapper">
        <button className="btn secondary-v custom-button" onClick={handleNext}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmailValidator;
