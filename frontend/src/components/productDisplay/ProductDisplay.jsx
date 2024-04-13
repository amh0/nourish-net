import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Input from "../input/Input";
import { MapPin, Cube } from "@phosphor-icons/react";
import "./ProductDisplay.css";
import "../globals.css";

const imgPath = "http://localhost:3001/img/";
const apiURL = "http://localhost:3001/api/";

const ProductDisplay = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { product } = props;

  const [donnor, setDonnor] = useState([]);
  const [categories, setCategories] = useState([]);
  const idgen = product.idgeneral;
  const [cantidad, setCantidad] = useState();
  // agregar producto al carrito
  const handleRequest = async () => {
    const formData = {
      idalimento: product.idalimento,
      iddonacion: currentUser.idCarrito,
      cantidad: parseInt(cantidad),
    };
    console.log(formData);
    try {
      const result = await axios.post(
        apiURL + "donations/add_to_cart",
        formData
      );
      console.log("OK product added: " + result.status);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const handleQty = () => {
    if (cantidad > 0 && cantidad <= product.cantidad_disponible) {
      console.log(cantidad);
      handleRequest();
    }
  };
  // obtener categorias del producto
  useEffect(() => {
    const fetchCategoriesId = async () => {
      try {
        const result = await axios.post(apiURL + "products/categories_prod", {
          idalimento: product.idalimento,
        });
        setCategories(result.data);
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    };
    fetchCategoriesId();
  }, [product]);
  // obtener donante del producto
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const result = await axios.post(apiURL + "products/find_donnor", {
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

  const handleNumberChange = (e) => {
    if (e.target.value) {
      if (e.target.value < 0) {
        setCantidad(1);
      } else if (e.target.value > product.cantidad_disponible) {
        setCantidad(product.cantidad_disponible);
      } else {
        setCantidad(e.target.value);
      }
    } else {
      setCantidad();
    }
  };

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
            <p className="parr2">
              {donnor.ubicacion + ", " + donnor.direccion}
            </p>
          </div>
          <div>
            <Cube
              className="icon"
              size={24}
              weight="light"
              color="var(--textlight)"
            />
            <p className="parr2">
              {product.cantidad_disponible} {product.unidad_medida}
            </p>
          </div>
        </div>
        <div className="controls-container">
          <div>
            <Cube size={24} weight="light" color="var(--textlight)" />
            {/* <p className="parr1 bold">Cantidad:</p> */}
            <div className="input-wrapper">
              <Input
                id="cantidad"
                name="cantidad"
                type="number"
                min={1}
                max={product.cantidad_disponible}
                value={cantidad}
                onChange={(e) => handleNumberChange(e)}
                placeholder="Cantidad"
              />
            </div>
          </div>
          {/* <Link
            className="link"
            to={`/producto/${product.idalimento}/solicitud`}
            state={{ alimento: product, cantidad_solicitada: cantidad }}
          >
            <button className="btn secondary-v">Solicitar Alimento</button>
          </Link> */}
          <button className="btn secondary-v" onClick={handleQty}>
            Agregar Alimento
          </button>
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
