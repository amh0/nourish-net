import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import Input from "../input/Input";

const OrgRegForm = ({ formData, title, buttonText, onBack, onNext }) => {
  const [nameOrg, setNameOrg] = useState(formData.setNameOrg || "");
  const [addressOrg, setAddressOrg] = useState(formData.setAddressOrg || "");
  const [phoneNumberOrg, setPhoneNumberOrg] = useState(
    formData.phoneNumberOrg || ""
  );
  const [cellPhoneNumberOrg, setCellPhoneNumberOrg] = useState(
    formData.cellPhoneNumberOrg || ""
  );

  const handleNext = () => {
    onNext({
      nameOrg,
      addressOrg,
      phoneNumberOrg,
      cellPhoneNumberOrg,
    });
  };

  return (
    <div className="step">
      <h2>{title}</h2>
      <div className="marginBottom">
        <p>Completa los datos de tu organización</p>
      </div>

      <div className="btn-margin-bottom">
        <Input
          id="nameO"
          type="text"
          value={nameOrg}
          onChange={(e) => setNameOrg(e.target.value)}
          placeholder="Nombre organización"
        />
      </div>

      <div className="btn-margin-bottom">
        <Input
          id="addressOrg"
          type="text"
          value={addressOrg}
          onChange={(e) => setAddressOrg(e.target.value)}
          placeholder="Dirección"
        />
      </div>
      <div className="button-container btn-margin-bottom">
        <Input
          id="cellPhoneNumber"
          type="tel"
          value={cellPhoneNumberOrg}
          onChange={(e) => setCellPhoneNumberOrg(e.target.value)}
          placeholder="Celular"
        />
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumberOrg}
          onChange={(e) => setPhoneNumberOrg(e.target.value)}
          placeholder="Teléfono"
        />
      </div>
      <div className="button-wrapper">
        <button className="btn grey-v custom-btn-grey" onClick={onBack}>
          <ArrowLeft size={30} color="var(--background1)" />
        </button>
        <button className="btn secondary-v custom-button" onClick={handleNext}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OrgRegForm;
