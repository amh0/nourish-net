import React from "react";
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
} from "@phosphor-icons/react";
const DonationItem = (props) => {
  return (
    <div className="donation-item">
      <div className="img-container">
        <img src={props.imagen} alt="" />
      </div>
      <div className="donation-data section-1">
        <p className="parr1 bold">{props.nombre}</p>
        <div className="row-wrapper">
          <Cube size={24} weight="light" color="var(--textlight)" />
          <p className="parr1 ">
            {props.cantidad_donacion + " " + props.unidad_medida}{" "}
          </p>
        </div>
      </div>
      <div className="col-separator"></div>
      <div className="donation-data section-2">
        <div className="row-wrapper">
          <User size={24} color="var(--textlight)" weight="light" />
          <p className="parr1">{props.nombre_receptor}</p>
        </div>
        <div className="row-wrapper">
          <MapPin size={24} weight="light" color="var(--secondary)" />
          <p className="parr1 ">{props.direccion}</p>
        </div>
        <div className="date-section">
          <div className="row-wrapper date-wrapper">
            <CalendarBlank size={24} color="var(--textlight)" weight="light" />
            <p className="parr1 ">
              {new Date(props.fecha_entrega).toLocaleDateString("es-BO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="row-wrapper date-wrapper">
            <Clock size={24} color="var(--textlight)" weight="light" />
            <p className="parr1">{props.hora_entrega}</p>
          </div>
        </div>
      </div>
      <div className="col-separator"></div>
      <div className="donation-data status-container">
        <div className="icon-wrapper">
          <Export size={32} weight="light" color="var(--textlight)" />
        </div>
        <p className="parr2">{props.estado}</p>
        <div className="row-wrapper">
          <button className="btn secondary-v">
            <Check size={16} color="var(--background0)" weight="regular" />
          </button>
          <button className="btn tertiary-v">
            <X size={16} color="var(--background0)" weight="regular" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationItem;
