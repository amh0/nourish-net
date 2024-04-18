import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Warning,
  CheckCircle,
  ShoppingCartSimple,
  X,
} from "@phosphor-icons/react";

import { AuthContext } from "../context/authContext";
import Input from "../components/input/Input";
import "./css/CoordSolicitud.css";
import "./css/CartPage.css";

const imgPath = "http://localhost:3001/img/";
const apiURL = "http://localhost:3001/api/";

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

const CartPage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const formData = {
      idDonacion: currentUser.idCarrito,
      idGeneral: currentUser.idusuario,
    };
    try {
      const result = await axios.post(
        apiURL + "donations/get_donation_products",
        formData
      );
      setProducts(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };

  const [method, setMethod] = useState(methodOptions[0]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [msg, setMsg] = useState("");

  const [insertState, setInsertState] = useState("none");
  const [formError, setFormError] = useState(false);

  const handleNewCart = (data) => {
    console.log("idCarrito" + data.idCarrito);
    setCurrentUser({ ...currentUser, idCarrito: data.idCarrito, itemQty: 0 });
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
      tipoEnvio: method.value,
      estado: "Solicitado",
      fechaEntrega: fecha,
      horaEntrega: hora,
      mensajeSolicitud: msg,
      idDonacion: currentUser.idCarrito, // id del receptor
      idGeneral: currentUser.idusuario,
      fechaSolicitud: new Date().toJSON(),
    };
    console.log("formData", formData);
    axios
      .post(apiURL + "donations/request_donation", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Data inserted");
          console.log(res.data);
          setInsertState("success");
          handleNewCart(res.data);
        } else {
          console.log("An error has occurred");
          setInsertState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async (e, id) => {
    console.log("clicked");
    console.log(id);
    const formData = {
      idDonacion: currentUser.idCarrito,
      idAlimento: id,
    };
    try {
      await axios.post(apiURL + "donations/remove_product", formData);
      console.log("deleted");
      setCurrentUser((prev) => {
        return { ...prev, itemQty: prev.itemQty - 1 };
      });
      fetchProducts();
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  return (
    <div className="coordination">
      {currentUser.itemQty > 0 || insertState !== "none" ? (
        <>
          <h4 className="title4 accent-secondary">Coordinar entrega</h4>
          <div>
            <div className="grid-prod parr1">
              <div className="parr1 bold">Alimento</div>
              <div className="parr1 bold cell-left">Cantidad</div>
              <div className="parr1 bold cell-left">Unidad</div>
              <div className="parr1 bold cell-left"></div>
              <div className="row-border"></div>
              {products.map((item, i) => {
                return (
                  <Fragment key={item.idalimento}>
                    <div className="product-name-container">
                      <div className="img-container">
                        <img src={imgPath + item.imagen} alt="" />
                      </div>
                      <div>{item.nombre}</div>
                    </div>
                    <div className="cell-left">{item.cantidad}</div>
                    <div className="cell-left">{item.unidad_medida}</div>
                    <button
                      className="btn bg0-tertiary-v"
                      onClick={(e) => handleDelete(e, item.idalimento)}
                    >
                      <X
                        size={16}
                        color="var(--tertiary_strong)"
                        weight={"bold"}
                      />
                    </button>
                    {i !== products.length - 1 ? (
                      <div className="row-border-lighter"></div>
                    ) : null}
                  </Fragment>
                );
              })}
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
                  min={moment().format("YYYY-MM-DD")}
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
              <div className="parr1 text-address">Av. Mariscal Santa Cruz</div>
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
                  <CheckCircle
                    size={32}
                    color="var(--secondary)"
                    weight="light"
                  />
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
          ) : null}
        </>
      ) : (
        <div className="empty-cart">
          <ShoppingCartSimple size={64} color="var(--textlight)" />
          <h4 className="title5">Tu carrito esta vacío</h4>
          <p className="parr1">
            Selecciona al menos un producto para coordinar la entrega
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
