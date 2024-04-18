import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";
import "../globals.css";
import { MapPin, Cube } from "@phosphor-icons/react";
const Item = (props) => {
  return (
    <div className="item">
      <Link
        className="link"
        to={
          props.evaluacion
            ? `/evaluacion/${props.idalimento}`
            : `/producto/${props.idalimento}`
        }
      >
        <div className="item-text">
          <h4 className="item-title title5">{props.nombre}</h4>
          <p className="parr2">{props.desc}</p>
        </div>
      </Link>
      <Link className="link" to={`/producto/${props.idalimento}`}>
        <div className="img-container">
          <img src={props.imagen} alt="" />
        </div>
      </Link>
      <div className="item-location">
        <MapPin size={24} weight="light" color="var(--secondary)" />
        <p className="parr1">{props.direccion}</p>
      </div>
      <div className="item-specs">
        <Cube size={24} weight="light" color="var(--textlight)" />
        <div className="item-specs-qty">
          {props.cantidad} <span className="units">{props.unidad_medida}</span>
        </div>
      </div>
    </div>
  );
};
// ALIMENTO: idalimento, nombre, descripcion, tipo,
// fecha_vencimiento, cantidad, unidad_medida, proveedor, imagen.
export default Item;
