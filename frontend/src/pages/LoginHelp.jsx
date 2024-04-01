import React, { useState } from "react";
import "../components/signup-form/step/Step.css";

import EmailValidator from "../components/email-validator/EmailValidator";
import VerificationForm from "../components/verificationForm/VerificationForm";
import PasswordForm from "../components/passwordForm/PasswordForm";
import OperationComplete from "../components/operation-complete/OperationComplete";
import axios from "axios";

const LoginHelp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [verificationCode, setVerificationCode] = useState("");

  const handleNext = async (data) => {
    try {
      setFormData({ ...formData, ...data });
      setStep(step + 1);

      if (step === 3) {
        await updatePassword(data.password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePassword = async (password) => {
    try {
      await axios.post("http://localhost:3001/api/auth/forgotPassword", {
        email: formData.email,
        password: password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextSendCode = ({ email, verificationCode }) => {
    setFormData({ email });
    setStep(step + 1);
    setVerificationCode(verificationCode);
  };

  const handleBack = () => {
    if (step === 3 || step === 4) {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="signup-container">
      <div className="rectangle-container"></div>
      <div>
        {step === 1 && (
          <EmailValidator
            formData={formData}
            title={"¿Olvidaste tu contraseña?"}
            description={"Ingresa tu correo electrónico"}
            buttonText={"Continuar"}
            existsInDB={1}
            onNext={handleNextSendCode}
          />
        )}
        {step === 2 && (
          <VerificationForm
            email={formData.email}
            verificationCode={verificationCode}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <PasswordForm
            formData={formData}
            title={"Contraseña"}
            description={"Ingresa una nueva contraseña"}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {step === 4 && (
          <OperationComplete
            title="Contraseña actualizada"
            description="¡Tu contraseña ha sido cambiada con éxito! Ahora puedes acceder a tu cuenta"
            buttonText={"Iniciar sesión"}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default LoginHelp;
