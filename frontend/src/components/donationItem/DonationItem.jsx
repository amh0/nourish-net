import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonationItem.css";
import {
  Export,
  Cube,
  CalendarBlank,
  Clock,
  MapPin,
  Check,
  X,
  User,
  CheckCircle,
  ArrowClockwise,
  XCircle,
  WarningCircle,
} from "@phosphor-icons/react";
const imgPath = "http://localhost:3001/img/";
const apiPath = "http://localhost:3001/api";
const DonationItem = (props) => {
  // Lado donante
  const [donacion, setDonacion] = useState(props.donacion);
  console.log("props", donacion);
  let nuevoEstado = donacion.estado;
  const handleAccept = () => {
    nuevoEstado = "";
    if (donacion.estado === "Solicitado") {
      nuevoEstado = "Pendiente";
    } else if (donacion.estado === "Pendiente") {
      nuevoEstado = "Entregado";
    } else {
      return;
    }
    setDonacion((d) => ({ ...d, estado: nuevoEstado }));
    handleQuery();
  };
  const handleDeny = () => {
    if (donacion.estado === "Solicitado") {
      nuevoEstado = "Rechazado";
    } else if (donacion.estado === "Pendiente") {
      nuevoEstado = "Cancelado";
    } else {
      return;
    }
    setDonacion((d) => ({ ...d, estado: nuevoEstado }));
    handleQuery();
  };
  useEffect(() => {}, []);
  const handleQuery = () => {
    const formData = {
      iddonacion: donacion.iddonacion,
      estado: nuevoEstado,
    };
    console.log(formData);
    axios
      .post("http://localhost:3001/api/donations/update_status", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Status uptaded");
        } else {
          console.log("An error has occurred");
          // setInsertState("error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="donation-item">
      <div className="img-container">
        <img src={imgPath + donacion.imagen} alt="" />
      </div>
      <div className="donation-data section-1">
        <p className="parr1 bold">{donacion.nombre_alimento}</p>
        <div className="row-wrapper">
          <Cube size={24} weight="light" color="var(--textlight)" />
          <p className="parr1 ">
            {donacion.cantidad_donacion + " " + donacion.unidad_medida}{" "}
          </p>
        </div>
      </div>
      <div className="col-separator"></div>
      <div className="donation-data section-2">
        <div className="row-wrapper">
          <User size={24} color="var(--textlight)" weight="light" />
          <p className="parr1 single-line">{donacion.nombre_receptor}</p>
        </div>
        <div className="row-wrapper">
          <MapPin size={24} weight="light" color="var(--secondary)" />
          <p className="parr1 single-line">{donacion.direccion_receptor}</p>
        </div>
        <div className="date-section">
          <div className="row-wrapper date-wrapper">
            <CalendarBlank size={24} color="var(--textlight)" weight="light" />
            <p className="parr1 ">
              {new Date(donacion.fecha_entrega).toLocaleDateString("es-BO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="row-wrapper date-wrapper">
            <Clock size={24} color="var(--textlight)" weight="light" />
            <p className="parr1">{donacion.hora_entrega}</p>
          </div>
        </div>
      </div>
      <div className="col-separator"></div>
      <div className="donation-data status-container">
        <div className="icon-wrapper">
          {donacion.estado === "Entregado" ? (
            <CheckCircle size={32} color="var(--secondary)" weight="light" />
          ) : donacion.estado === "Pendiente" ? (
            <ArrowClockwise size={32} color="var(--primary)" weight="light" />
          ) : donacion.estado === "Solicitado" ? (
            <Export size={32} color="var(--textlight)" weight="light" />
          ) : donacion.estado === "Cancelado" ? (
            <XCircle size={32} color="var(--tertiary)" weight="light" />
          ) : donacion.estado === "Rechazado" ? (
            <WarningCircle size={32} color="var(--tertiary)" weight="light" />
          ) : (
            <></>
          )}
        </div>
        <p className={donacion.estado.toLowerCase() + " parr2"}>
          {donacion.estado}
        </p>
        {donacion.estado === "Entregado" ||
        donacion.estado === "Cancelado" ||
        donacion.estado === "Rechazado" ? null : (
          <div className="row-wrapper">
            <button className="btn secondary-v">
              <Check
                size={16}
                color="var(--background0)"
                weight="regular"
                onClick={handleAccept}
              />
            </button>
            <button className="btn tertiary-v">
              <X
                size={16}
                color="var(--background0)"
                weight="regular"
                onClick={handleDeny}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationItem;
