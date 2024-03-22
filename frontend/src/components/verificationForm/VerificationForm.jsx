import React, { useState, useRef } from "react";
import "./VerificationForm.css";
import { ArrowLeft, EnvelopeSimple } from "phosphor-react";

const VerificationForm = ({ email, verificationCode, onBack, onNext }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [mensageError, setMessageError] = useState("");

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerification = () => {
    const enterCode = code.join("");
    if (enterCode === "") {
      setMessageError("Ingrese el código");
    } else if (enterCode === verificationCode.toString()) {
      onNext();
    } else {
      setMessageError("El código no coincide.");
      setCode(["", "", "", "", "", ""]);
    }
  };

  return (
    <div className="step">
      <h2>Verificación</h2>

      <p>Enviamos un código de verificación a tu correo</p>
      <div className="margin-bottom-align">
        <EnvelopeSimple size={21} color="var(--textlight)" />
        <span className="underline">{email}</span>
      </div>
      <div className="marginBottom">
        <p>Ingresa el código:</p>
      </div>

      <div>
        {code.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value}
            maxLength={1}
            onChange={(e) => {
              handleInputChange(e, index);
            }}
            className="verification-input"
          />
        ))}
      </div>
      <div>
        <span className="mensageError">{mensageError}</span>
      </div>
      <div className="button-wrapper">
        <button className="btn grey-v" onClick={onBack}>
          <ArrowLeft size={30} color="var(--background1)" />
        </button>
        <button
          className="btn secondary-v custom-button"
          onClick={handleVerification}
        >
          Verificar
        </button>
      </div>
    </div>
  );
};

export default VerificationForm;
