import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../context/authContext";
import Input from "../input/Input";
import { Cube, CheckCircle, Warning, Toolbox } from "@phosphor-icons/react";
import "./ProductDisplay.css";
import "../globals.css";

const imgPath = "http://localhost:3001/img/";
const apiURL = "http://localhost:3001/api/";
let evalDefault = [
  {
    value: 0,
    label: "Excelente",
  },
  {
    value: 1,
    label: "Optimo",
  },
  {
    value: 2,
    label: "Deficiente",
  },
  {
    value: 3,
    label: "Error",
  },
];
const listStyle = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#E2F0EE",
    };
  },
  multiValueRemove: (styles, { data }) => {
    return {
      ...styles,
      cursor: "pointer",
    };
  },
};
const ProductDisplay = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { product } = props;
  const { isEval } = props;
  const [donnor, setDonnor] = useState([]);
  const [categories, setCategories] = useState([]);
  const idgen = product.idgeneral;
  const [cantidad, setCantidad] = useState();
  const [insertState, setInsertState] = useState("none");

  // evaluation
  const [evalSel, setEvalSel] = useState(
    product.evaluation === "No evaluado"
      ? null
      : evalDefault.find((e) => e.label === product.evaluacion)
  );
  // agregar producto al carrito
  const handleRequest = async () => {
    const formData = {
      idAlimento: product.idalimento,
      idDonacion: currentUser.idCarrito,
      cantidad: parseInt(cantidad),
      fechaAgregado: moment().format(),
    };
    console.log(formData);
    try {
      setInsertState("loading");
      const result = await axios.post(
        apiURL + "donations/add_to_cart",
        formData
      );
      console.log("OK product added: " + result.status);
      setInsertState("success");
      if (result.data.rowAdded) {
        setCurrentUser((prev) => {
          return { ...prev, itemQty: prev.itemQty + 1 };
        });
      }
    } catch (err) {
      setInsertState("error");
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
  // eval
  const handleEvalSelection = (evalSel) => {
    setEvalSel(evalSel);
  };
  const handleEval = async () => {
    if (product.evaluacion === "No evaluado") {
      setInsertState("loading");
      const formData = {
        evaluacion: evalSel.label,
        idVoluntario: currentUser.idusuario,
        idAlimento: product.idalimento,
      };
      //console.log("form", formData);
      try {
        await axios.post(apiURL + "products/update_eval", formData);
        setInsertState("success");
      } catch (err) {
        console.log("Error");
        console.log(err);
        setInsertState("error");
      }
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
            <Cube
              className="icon"
              size={24}
              weight="light"
              color="var(--secondary)"
            />
            <p className="parr2">
              {product.cantidad_disponible} {product.unidad_medida}{" "}
              disponible(s)
            </p>
          </div>
        </div>
        <div className="controls-container">
          {isEval ? (
            <>
              <div>
                <Toolbox size={24} weight="light" color="var(--textlight)" />
                <div className="input-wrapper">
                  <Select
                    className="list-option"
                    options={evalDefault}
                    components={makeAnimated()}
                    closeMenuOnSelect={true}
                    value={evalSel}
                    onChange={handleEvalSelection}
                    styles={listStyle}
                    noOptionsMessage={() => "Sin resultados"}
                    placeholder={"Evaluación"}
                    isDisabled={
                      product.evaluacion !== "No evaluado" ||
                      product.evaluacion === ""
                    }
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        text: "orangered",
                        primary25: "#E2F0EE",
                        primary50: "#99CBC5",
                        primary: "#red",
                      },
                    })}
                  />
                </div>
              </div>
              <button className="btn secondary-v" onClick={handleEval}>
                Evaluar
              </button>
            </>
          ) : (
            <>
              <div>
                <div className="icon-container">
                  <Cube size={24} weight="light" color="var(--textlight)" />
                </div>
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
              <button className="btn secondary-v" onClick={handleQty}>
                Agregar Alimento
              </button>
            </>
          )}
        </div>
        {insertState !== "none" ? (
          <div className={"state-container product-state " + insertState}>
            {insertState === "loading" ? (
              <>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p className="parr1">
                  {isEval ? "Actualizando..." : "Agregando..."}
                </p>
              </>
            ) : insertState === "success" ? (
              <>
                <CheckCircle
                  size={32}
                  color="var(--secondary)"
                  weight="light"
                />
                <p className="parr1 boldparr">
                  {isEval ? "¡Alimento evaluado!" : "¡Alimento agregado!"}
                </p>
              </>
            ) : insertState === "error" ? (
              <>
                <Warning size={32} color="var(--tertiary)" weight="light" />
                <p className="parr1 boldparr">Error</p>
                <p className="parr2">Ha ocurrido un error inesperado</p>
              </>
            ) : null}
          </div>
        ) : null}
        {isEval ? (
          <p className="parr1 parr-row">
            <span className="bold-text">Control de calidad: </span>
            {product.nombreVoluntario}
          </p>
        ) : (
          <></>
        )}
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
