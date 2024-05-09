import React, { useState } from "react";
import "./Step.css";
import { ArrowLeft } from "phosphor-react";
import Switch from "../../switch/Switch";

const IsOrgSwitch = ({ formData, onBack, onNext }) => {
  const [isOrganization, setIsOrganization] = useState(
    formData.isOrganization || false
  );

  const handleNext = () => {
    onNext({ isOrganization });
  };

  return (
    <div>
      <h2>Registro</h2>
      <div className="marginBottom">
        <p>Para brindarte un mejor servicio, necesitamos saber si</p>
      </div>
      <div>
        <div className="switch-container">
          <label className="text-option">
            ¿Representas a una organización?
          </label>
          <Switch
            checked={isOrganization}
            onChange={(checked) => {
              setIsOrganization(checked);
            }}
            id="isOrganization-switch"
          />
        </div>
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

export default IsOrgSwitch;
