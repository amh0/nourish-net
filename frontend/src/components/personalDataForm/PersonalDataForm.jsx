import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import Input from "../input/Input";

const PersonalDataForm = ({
  formData,
  title,
  buttonText,
  description,
  onBack,
  onNext,
}) => {
  const [name, setName] = useState(formData.name || "");
  const [lastName, setLastName] = useState(formData.lastName || "");
  const [secondLastName, setsecondLastName] = useState(
    formData.secondLastName || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || "");
  const [address, setAddress] = useState(formData.address || "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || "");
  const [cellPhoneNumber, setCellPhoneNumber] = useState(
    formData.cellPhoneNumber || ""
  );

  const handleNext = () => {
    onNext({
      name,
      lastName,
      secondLastName,
      dateOfBirth,
      address,
      phoneNumber,
      cellPhoneNumber,
    });
  };

  return (
    <div className="step">
      <h2>{title}</h2>
      <div className="marginBottom">
        <p>{description}</p>
      </div>

      <div className="btn-margin-bottom">
        <Input
          id="nameP"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
      </div>

      <div className="button-container btn-margin-bottom">
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido paterno"
        />
        <Input
          id="seondLastName"
          type="text"
          value={secondLastName}
          onChange={(e) => setsecondLastName(e.target.value)}
          placeholder="Apellido materno"
        />
      </div>

      <div className="btn-margin-bottom">
        <Input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="Fecha Nacimiento"
        />
      </div>
      <div className="btn-margin-bottom">
        <Input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Dirección"
        />
      </div>
      <div className="button-container btn-margin-bottom">
        <Input
          id="cellPhoneNumber"
          type="tel"
          value={cellPhoneNumber}
          onChange={(e) => setCellPhoneNumber(e.target.value)}
          placeholder="Celular"
        />
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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

export default PersonalDataForm;
