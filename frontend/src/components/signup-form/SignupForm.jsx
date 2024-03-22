import React, { useState } from "react";
import "./SignupForm.css";
import EmailValidator from "../email-validator/EmailValidator";
import VerificationForm from "../verificationForm/VerificationForm";
import PasswordForm from "../passwordForm/PasswordForm";
import IsOrgSwitch from "./step/IsOrgSwitch";
import SwitchOptions from "./step/SwitchOptions";

import SignupComplet from "./step/SignupComplet";
import PersonalDataForm from "../personalDataForm/PersonalDataForm";
import OrgRegForm from "../orgRegForm/OrgRegForm";

import axios from "axios";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [verificationCode, setVerificationCode] = useState("");

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
    if (
      (!formData.isOrganization && step === 6) ||
      (formData.isOrganization && step === 7)
    ) {
      registerUser();
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

  const registerUser = () => {
    try {
      axios.post("http://localhost:3001/register", {
        email: formData.email,
        encPassword: formData.encPassword,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="rectangle-container"></div>
      <div>
        {step === 1 && (
          <EmailValidator
            formData={formData}
            title={"Registro"}
            description={"Aquí es donde comienza el cambio"}
            buttonText={"Continuar"}
            existsInDB={0}
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
            title={"Registro"}
            onBack={handleBack}
            onNext={handleNext}
            description={"Ingresa una contraseña"}
          />
        )}
        {step === 4 && (
          <IsOrgSwitch
            formData={formData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {step === 5 && (
          <SwitchOptions
            formData={formData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {!formData.isOrganization && step === 6 && (
          <PersonalDataForm
            formData={formData}
            title={"Registro"}
            description={"Datos personales"}
            buttonText={"Completar registro"}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {!formData.isOrganization && step === 7 && <SignupComplet />}

        {formData.isOrganization && step === 6 && (
          <OrgRegForm
            formData={formData}
            title={"Registro"}
            buttonText={"Continuar"}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {formData.isOrganization && step === 7 && (
          <PersonalDataForm
            formData={formData}
            title={"Registro"}
            buttonText={"Completar registro"}
            description={
              "Datos personales del representante de la organización"
            }
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {formData.isOrganization && step === 8 && <SignupComplet />}
      </div>
    </div>
  );
};

export default SignupForm;
