import React, { useState } from "react";
import "./Step.css";
import { ArrowLeft } from "phosphor-react";
import Switch from "../../switch/Switch";

const SwitchOptions = ({ formData, onBack, onNext }) => {
  const [isVolunteer, setIsVolunteer] = useState(formData.isVolunteer || false);
  const [isDonor, setIsDonor] = useState(formData.isDonor || false);
  const [isReceiver, setIsReceiver] = useState(formData.isReceiver || false);
  //--------------------------------------------
  // const [isDonOrg, setIsDonOrg] = useState(formData.isDonOrg || false);
  // const [isRecOrg, setIsRecOrg] = useState(formData.isRecOrg || false);
  const [isCharOrg, setIsCharOrg] = useState(formData.isCharOrg || false);

  const handleNext = () => {
    if (!formData.isOrganization) {
      onNext({ isVolunteer, isDonor, isReceiver });
    } else {
      onNext({ isDonor, isReceiver, isCharOrg });
    }
  };

  const renderForm = () => {
    if (!formData.isOrganization) {
      return (
        <div>
          <div className="marginBottom">
            <p>¿Cómo usarás la plataforma?</p>
          </div>
          <div className="switch-container">
            <label className="text-option">Voluntario</label>
            <Switch
              onChange={(checked) => {
                setIsVolunteer(checked);
              }}
              checked={isVolunteer}
              id="isVolunteer-switch"
            />
          </div>
          <div className="switch-container">
            <label className="text-option">Donar alimentos</label>
            <Switch
              onChange={(checked) => {
                setIsDonor(checked);
              }}
              checked={isDonor}
              id="isDonor-switch"
            />
          </div>
          <div className="switch-container">
            <label className="text-option">Recibir alimentos</label>
            <Switch
              onChange={(checked) => {
                setIsReceiver(checked);
              }}
              checked={isReceiver}
              id="isReceiver-switch"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="marginBottom">
            <p>Selecciona el tipo de organización</p>
          </div>
          <div className="switch-container">
            <label className="text-option">Organización Donante</label>
            <Switch
              onChange={(checked) => {
                setIsDonor(checked);
              }}
              checked={isDonor}
              id="isDonorOrg-switch"
            />
          </div>
          <div className="switch-container">
            <label className="text-option">Organización Receptora</label>
            <Switch
              onChange={(checked) => {
                setIsReceiver(checked);
              }}
              checked={isReceiver}
              id="isRecOrg-switch"
            />
          </div>
          <div className="switch-container">
            <label className="text-option">Organización Benéfica</label>
            <Switch
              onChange={(checked) => {
                setIsCharOrg(checked);
              }}
              checked={isCharOrg}
              id="isCharOrg-switch"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      {renderForm()}
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

export default SwitchOptions;
