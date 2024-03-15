import React, { useState } from "react";
import "./Step.css";
import { ArrowLeft } from "phosphor-react";

const StepThree = ({ formData, onBack, onNext }) => {
  const [isOrganization, setIsOrganization] = useState(
    formData.isOrganization || false
  );
  //---------------------------------------
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
  //------------------------------------------------------------

  const [orgName, setOrgName] = useState(formData.orgName || "");
  const [entityType, setEntityType] = useState(formData.entityType || "");
  const [orgAddress, setOrgAddress] = useState(formData.orgAddress || "");
  const [orgPhoneNumber, setOrgPhoneNumber] = useState(
    formData.orgPhoneNumber || ""
  );

  const handleNext = () => {
    if (!isOrganization) {
      onNext({
        name,
        lastName,
        secondLastName,
        dateOfBirth,
        address,
        phoneNumber,
        cellPhoneNumber,
      });
    } else {
      onNext({ orgName, entityType, orgAddress, orgPhoneNumber });
    }
  };

  const renderForm = () => {
    if (!isOrganization) {
      return (
        <div className="step">
          <div>
            <p className="parr2">Datos personales</p>
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Apellido paterno"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="lastName"
              value={lastName}
              required
            />
            <input
              className="input"
              placeholder="Apellido materno"
              onChange={(e) => setsecondLastName(e.target.value)}
              type="text"
              name="seondLastName"
              value={secondLastName}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              placeholder="Fecha Nacimiento"
            />
            <input
              className="input"
              placeholder="Direccion"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              value={address}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Celular"
              onChange={(e) => setCellPhoneNumber(e.target.value)}
              type="tel"
              name="cellPhoneNumber"
              value={cellPhoneNumber}
              required
            />
            <input
              className="input"
              placeholder="Telefono"
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              required
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="step">
          <div>
            <p className="parr2">Datos de la organización</p>
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Nombre Organización"
              onChange={(e) => setOrgName(e.target.value)}
              type="text"
              name="orgName"
              value={orgName}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              onChange={(e) => setEntityType(e.target.value)}
              type="text"
              name="entityType"
              value={entityType}
              placeholder="Tipo de entidad"
            />
            <input
              className="input"
              placeholder="Telefono"
              onChange={(e) => setOrgPhoneNumber(e.target.value)}
              type="tel"
              name="orgPhoneNumber"
              value={orgPhoneNumber}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Dirección"
              onChange={(e) => setOrgAddress(e.target.value)}
              type="text"
              name="orgAddress"
              value={orgAddress}
              required
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="step">
      <h2 className="title3">Registro</h2>

      {renderForm()}
      <div className="button-wrapper">
        <button className="btn grey-v custom-btn-grey" onClick={onBack}>
          <ArrowLeft size={30} color="var(--background1)" />
        </button>
        <button className="btn secondary-v custom-button" onClick={handleNext}>
          Completar registro
        </button>
      </div>
    </div>
  );
};

export default StepThree;
