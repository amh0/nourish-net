import React, { useState } from "react";
import "./SignupForm.css";
import StepOne from "./step/StepOne";
import StepTwo from "./step/StepTwo";
import StepThree from "./step/StepThree";
import SignupComplet from "./step/SignupComplet";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const completeSignup = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
    alert(JSON.stringify({ ...formData, ...data }));
  };

  return (
    <div className="signup-container">
      <div className="rectangle-container"></div>
      <div>
        {step === 1 && <StepOne formData={formData} onNext={handleNext} />}
        {step === 2 && (
          <StepTwo
            formData={formData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            onBack={handleBack}
            onNext={completeSignup}
          />
        )}
        {step === 4 && <SignupComplet />}
      </div>
    </div>
  );
};

export default SignupForm;
