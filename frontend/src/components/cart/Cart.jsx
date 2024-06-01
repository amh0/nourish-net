import React, { useState, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Warning, CheckCircle } from "@phosphor-icons/react";
import { AuthContext } from "../../context/authContext";

import Input from "../input/Input";
import "./Coordination.css";

const imgPath = "https://nourish-net-api.onrender.com/img/";
const apiPath = "https://nourish-net-api.onrender.com/api";
const methodOptions = [
  {
    value: "Personal",
    label: "Personal",
    desc: "La entrega se realizará de forma personal.",
  },
  {
    value: "Voluntario",
    label: "Voluntario",
    desc: "Un voluntario realizará la entrega de la donación.",
  },
];

const Cart = (props) => {
  const { currentUser } = useContext(AuthContext);

  const { product } = props;
  const cantidad = props.cantidad || 1;
  const [method, setMethod] = useState(methodOptions[0]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [msg, setMsg] = useState("");

  const [insertState, setInsertState] = useState("none");
  const [formError, setFormError] = useState(false);
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

  const handleOptSelection = (selectedOpt) => {
    setMethod(selectedOpt);
  };

  const handleForm = () => {
    // TODO validation
    if (fecha && hora) {
      handleData();
    } else {
      setFormError(true);
      console.log("error");
    }
  };
  const handleData = () => {
    const formData = {
      tipo_envio: method.value,
      estado: "Solicitado",
      fecha_entrega: fecha,
      hora_entrega: hora,
      mensaje_solicitud: msg,
      cantidad_donacion: cantidad,
      idgeneral: currentUser.idusuario, // id del receptor
      idalimento: product.idalimento,
    };
    console.log("formData", formData);
    axios
      .post(apiPath + "/donations/insert_donation", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Data inserted");
          setInsertState("success");
        } else {
          console.log("An error has occurred");
          setInsertState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="coordination">
      <h4 className="title4 accent-secondary">Coordinar entrega</h4>
      <div>
        <div className="grid-prod parr1">
          <div className="parr1 bold">Alimento</div>
          <div className="parr1 bold cell-left">Cantidad</div>
          <div className="parr1 bold cell-left">Unidad</div>
          <div className="row-border"></div>
          <div className="product-name-container">
            <div className="img-container">
              <img src={imgPath + product.imagen} alt="" />
            </div>
            <div>{product.nombre}</div>
          </div>
          <div className="cell-left">{cantidad}</div>
          <div className="cell-left">{product.unidad_medida}</div>
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
              value={method}
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
            <p className="parr2">{method.desc}</p>
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
          <div className="parr1 text-address">{product.direccion_don}</div>
        </div>
      </div>
      {formError ? (
        <p className="parr1 ">
          {" "}
          <span className="accent-tertiary">* </span>Verifica que los campos
          contengan datos validos
        </p>
      ) : null}
      <button className="btn secondary-v" onClick={handleForm}>
        Enviar solicitud
      </button>
      {insertState !== "none" ? (
        <div className={"state-container " + insertState}>
          {insertState === "loading" ? (
            <>
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="parr1">Enviando solicitud...</p>
            </>
          ) : insertState === "success" ? (
            <>
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
              <p className="parr1 boldparr">¡Solicitud enviada!</p>
              <p className="parr2">Aceptar</p>
            </>
          ) : insertState === "error" ? (
            <>
              <Warning size={32} color="var(--tertiary)" weight="light" />
              <p className="parr1 boldparr">Error</p>
              <p className="parr2">Ha ocurrido un error inesperado</p>
            </>
          ) : null}
        </div>
      ) : null}{" "}
    </div>
  );
};

export default Cart;
