import React, { useState } from "react";
import "./Step.css";
import { ArrowLeft } from "phosphor-react";
import Switch from "../switch/Switch";

const StepTwo = ({ formData, onBack, onNext }) => {
  const [isVolunteer, setIsVolunteer] = useState(
    formData.setIsVolunteer || false
  );
  const [isDonor, setIsDonor] = useState(formData.setIsDonor || false);
  const [isReceiver, setIsReceiver] = useState(formData.setIsReceiver || false);

  const handleCompleteClick = () => {
    alert(JSON.stringify(formData));
  };

  const handleNext = () => {
    onNext({ isVolunteer, isDonor, isReceiver });
  };

  return (
    <div className="step">
      <div className="step-two">
        <div>
          <h2 className="title3">Registro</h2>
        </div>
        <div>
          <p className="parr2">¿Cómo usarías la plataforma?</p>
        </div>
        {!formData.isOrganization ? (
          <div>
            <div className="switch-container">
              <label className="text-option">Voluntario</label>
              <Switch
                onChange={(checked) => setIsVolunteer(checked)}
                checked={isVolunteer}
                id="volunteer-switch"
              />
            </div>
          </div>
        ) : null}

        <div>
          <div className="switch-container">
            <label className="text-option">Donar alimentos</label>
            <Switch
              onChange={(checked) => setIsDonor(checked)}
              checked={isDonor}
              id="donor-switch"
            />
          </div>
          <div className="switch-container">
            <label className="text-option">Recibir alimentos</label>
            <Switch
              onChange={(checked) => setIsReceiver(checked)}
              checked={isReceiver}
              id="receiver-switch"
            />
          </div>
        </div>
        <div className="button-wrapper">
          <button className="btn grey-v custom-btn-grey" onClick={onBack}>
            <ArrowLeft size={30} color="var(--background1)" />
          </button>
          <button
            className="btn secondary-v custom-button"
            onClick={handleNext}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
