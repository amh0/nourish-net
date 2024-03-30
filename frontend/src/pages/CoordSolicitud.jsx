import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import Input from "../components/input/Input";
import "./css/CoordSolicitud.css";
const imgPath = "http://localhost:3001/img/";

const methodOptions = [
  {
    value: "personal",
    label: "Personal",
    desc: "La entrega se realizará de forma personal.",
  },
  {
    value: "voluntario",
    label: "Voluntario",
    desc: "Un voluntario realizará la entrega de la donación.",
  },
];
const CoordSolicitud = (props) => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [metodo, setMetodo] = useState(methodOptions[0]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [msg, setMsg] = useState("");

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
  useEffect(() => {
    setProduct(location.state.alimento);
  }, [location.state.alimento]);

  const handleOptSelection = (selectedOpt) => {
    setMetodo(selectedOpt);
  };

  const handleForm = () => {
    // TODO validation
    if (fecha && hora) {
      console.log("ok");
    } else {
      // setFormError(true);
      console.log("error");
    }
  };
  return (
    <div className="coordination">
      <h4 className="title4 accent-secondary">Coordinar entrega</h4>
      <div>
        <div className="grid-prod parr1">
          <div className="parr1 bold">Alimento</div>
          <div className="parr1 bold">Cantidad</div>
          <div className="parr1 bold">Unidad</div>
          <div className="row-border"></div>
          <div className="product-name-container">
            <div className="img-container">
              <img src={imgPath + product.imagen} alt="" />
            </div>
            <div>{product.nombre}</div>
          </div>
          <div>{product.cantidad}</div>
          <div>{product.unidad_medida}</div>
        </div>
        <div className="parr1">
          <span className="bold">Donante:</span> {product.organizacion}
        </div>
      </div>
      <div className="form-area">
        <div>
          <p className="parr1 bold metodo-title">
            <span className="accent-secondary"> Metodo de entrega</span>
          </p>
          <div className="row-wrapper ">
            <Select
              className="list-option"
              options={methodOptions}
              components={makeAnimated()}
              closeMenuOnSelect={false}
              value={metodo}
              defaultValue={methodOptions[0]}
              onChange={handleOptSelection}
              styles={listStyle}
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
            <p className="parr2">{metodo.desc}</p>
          </div>
        </div>
        <div className="row-wrapper">
          <div className="input-wrapper">
            <Input
              id="fecha"
              name="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              placeholder="Fecha de entrega"
            />
          </div>
          <div className="input-wrapper">
            <Input
              id="hora"
              name="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              placeholder="Hora de entrega"
            />
          </div>
        </div>
        <textarea
          className="text-area parr1 "
          name="msg"
          id="msg"
          cols="30"
          rows="10"
          placeholder="Mensaje de coordinación (opcional)"
          onChange={(e) => setMsg(e.target.value)}
        ></textarea>
        <div className="row-wrapper">
          <div className="form-label parr1 bold">Direccion entrega:</div>
          <div className="parr1 text-address">{product.direccion}</div>
        </div>
      </div>
      <button className="btn secondary-v" onClick={handleForm}>
        Publicar donación
      </button>
    </div>
  );
};

export default CoordSolicitud;
