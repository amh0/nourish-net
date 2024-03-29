import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDisplay.css";
import "../globals.css";
import { MapPin, Cube, CaretUpDown } from "@phosphor-icons/react";
const imgPath = "http://localhost:3001/img/";
const apiURL = "http://localhost:3001/api/products/";

const ProductDisplay = (props) => {
  const { product } = props;
  const idProduct = product.idalimento;
  const idgen = product.idgeneral;
  const [categories, setCategories] = useState([]);
  const [donnor, setDonnor] = useState([]);
  // obtener categorias del producto
  useEffect(() => {
    const fetchCategoriesId = async () => {
      try {
        const result = await axios.post(apiURL + "categories_prod", {
          idalimento: idProduct,
        });
        setCategories(result.data);
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    };
    fetchCategoriesId();
  }, [idProduct]);
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const result = await axios.post(apiURL + "find_donnor", {
          idgeneral: idgen,
        });
        setDonnor(result.data[0]);
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    };
    fetchDonor();
  }, [idgen]);
  return (
    <div className="product-display">
      <div className="img-section">
        <div className="img-container">
          <img src={imgPath + product.imagen} alt="" />
        </div>
        <div className="img-list">
          <div className="img-container">
            <img src={imgPath + product.imagen} alt="" />
          </div>
          <div className="img-container">
            <img src={imgPath + product.imagen} alt="" />
          </div>
          <div className="img-container">
            <img src={imgPath + product.imagen} alt="" />
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
        <p className="parr1 parr-row">{product.descripcion}</p>
        <p className="parr1 parr-row">
          <span className="bold-text">Fecha de vencimiento:</span>{" "}
          {new Date(product.fecha_vencimiento).toLocaleDateString("es-BO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="parr1">
          {" "}
          <span className="bold-text">Categorias:</span>{" "}
          {categories.length === 0
            ? "Sin categorias"
            : categories.map((item, i) => {
                let cat = item.nombre_cat;
                if (i < categories.length - 1) {
                  cat += ", ";
                } else {
                  cat += ". ";
                }
                return cat;
              })}
        </p>
        <h4 className="title4 desc">Donante</h4>
        <p className="parr1">{donnor ? donnor.nombre : ""}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
