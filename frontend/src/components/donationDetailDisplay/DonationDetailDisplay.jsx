import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Warning,
  CheckCircle,
  ShoppingCartSimple,
  X,
  Barcode,
} from "@phosphor-icons/react";
import { AuthContext } from "../../context/authContext";
import "./DonationDetailDisplay.css";
import {
  getFormattedDate,
  getFormattedHour,
  padNumber,
} from "../utils/functionUtils";
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

const DonationDetailDisplay = (props) => {
  const { idDonacion } = props;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [donation, setDonation] = useState();
  const [method, setMethod] = useState(methodOptions[0]);
  useEffect(() => {
    fetchProducts();
    fetchDetails();
  }, []);
  const fetchProducts = async () => {
    const formData = {
      idDonacion: idDonacion,
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
  const fetchDetails = async () => {
    const formData = {
      idDonacion: parseInt(idDonacion),
      idGeneral: currentUser.idusuario,
    };
    try {
      const result = await axios.post(
        apiURL + "donations/get_donation_details",
        formData
      );
      setDonation(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const handleOptSelection = (selectedOpt) => {
    setMethod(selectedOpt);
  };
  return (
    <div className="donation-display">
      <div className="title-wrapper">
        <h4 className="title4 accent-secondary">Detalles donacion</h4>
        <div className="row-wrapper">
          <Barcode size={24} color="var(--primary)" />
          <p className="parr1 ">{"COD: " + padNumber(idDonacion, 6, "0")}</p>
        </div>
      </div>
      <div>
        <div className="grid-prod parr1">
          <div className="parr1 bold">Alimento</div>
          <div className="parr1 bold cell-left">Cantidad</div>
          <div className="parr1 bold cell-left">Unidad</div>
          <div className="row-border"></div>
          {products.map((item, i) => {
            return (
              <Fragment key={item.idAlimento}>
                <div key={item.idalimento} className="product-name-container">
                  <div className="img-container">
                    <img src={imgPath + item.imagen} alt="" />
                  </div>
                  <div>{item.nombre}</div>
                </div>
                <div className="cell-left">{item.cantidad}</div>
                <div className="cell-left">{item.unidad_medida}</div>
                {i !== products.length - 1 ? (
                  <div className="row-border-lighter"></div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div>
        <h5 className="title5">Detalles de Solicitud</h5>
        <div className="donations-info">
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Receptor</div>
            <div className="parr1">Receptor</div>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Direccion</div>
            <div className="parr1">Direccion</div>
          </div>
          <div className="row-wrapper">
            <div className="row-wrapper">
              <div className="sub-title parr1 bold">Fecha</div>
              <div className="parr1">Receptor</div>
            </div>
            <div className="row-wrapper">
              <div className="sub-title parr1 bold">Fecha</div>
              <div className="parr1">Receptor</div>
            </div>
          </div>

          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Metodo</div>
            <div className="parr1">Direccion</div>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Mensaje</div>
            <p className="parr1">Direccion</p>
          </div>
        </div>
      </div>
      <div>
        <h5 className="title5">Detalles Voluntario</h5>
        <div className="donations-info">
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Receptor</div>
            <div className="parr1">Receptor</div>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Direccion</div>
            <div className="parr1">Direccion</div>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Metodo</div>
            <div className="parr1">Direccion</div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailDisplay;
