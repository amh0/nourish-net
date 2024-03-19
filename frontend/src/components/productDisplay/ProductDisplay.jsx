import React from "react";
import "./ProductDisplay.css";
import "../globals.css";
import { MapPin, Cube, CaretUpDown } from "@phosphor-icons/react";
const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className="product-display">
      <div className="img-section">
        <div className="img-container">
          <img src={product.imagen} alt="" />
        </div>
        <div className="img-list">
          <div className="img-container">
            <img src={product.imagen} alt="" />
          </div>
          <div className="img-container">
            <img src={product.imagen} alt="" />
          </div>
          <div className="img-container">
            <img src={product.imagen} alt="" />
          </div>
        </div>
      </div>
      <div className="product-text-section">
        <h3 className="title3">{product.nombre}</h3>
        <div className="product-details">
          <div>
            <MapPin
              className="icon"
              size={24}
              weight="light"
              color="var(--secondary)"
            />
            <p className="parr2">Av. Ballivian</p>
          </div>
          <div>
            <Cube
              className="icon"
              size={24}
              weight="light"
              color="var(--textlight)"
            />
            <p className="parr2">
              {product.cantidad} {product.unidad_medida}
            </p>
          </div>
        </div>
        <div className="controls-container">
          <div>
            <Cube size={24} weight="light" color="var(--textlight)" />
            <p className="parr1 bold">Cantidad:</p>
            <p className="parr1">0 {product.unidad_medida}</p>
            <CaretUpDown size={32} color="var(--text)" weight="light" />
          </div>
          <button className="btn secondary-v">Solicitar Alimento</button>
        </div>
        <h4 className="title4">Descripción</h4>
        <p className="parr1">{product.descripcion}</p>
        <h4 className="title4 desc">Donante</h4>
        <p className="parr1">Banco de Alimentos de Bolivia</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
