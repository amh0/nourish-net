import React from "react";
import "./Item.css";
import "../globals.css";
import { MapPin, Cube } from "@phosphor-icons/react";
const Item = (props) => {
  return (
    <div className="item">
      <div className="item-text">
        <h4 className="item-title title5">{props.nombre}</h4>
        <p className="parr2">{props.desc}</p>
      </div>
      <div className="img-container">
        <img src={props.imagen} alt="" />
      </div>
      <div className="item-location">
        <MapPin size={24} weight="light" color="var(--secondary)" />
        <p className="parr1">{props.ubicacion}</p>
      </div>
      <div className="item-specs">
        <Cube size={24} weight="light" color="var(--textlight)" />
        <p className="parr1">
          {props.cantidad} {props.unidad_medida}
        </p>
      </div>
    </div>
  );
};
// ALIMENTO: idalimento, nombre, descripcion, tipo,
// fecha_vencimiento, cantidad, unidad_medida, proveedor, imagen.
export default Item;
