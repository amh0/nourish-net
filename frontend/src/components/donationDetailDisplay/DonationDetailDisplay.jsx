import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Warning, CheckCircle, Barcode } from "@phosphor-icons/react";
import { AuthContext } from "../../context/authContext";
import { PageContext } from "../../context/PageContext";
import "./DonationDetailDisplay.css";
import {
  getFormattedDate,
  getFormattedHour,
  padNumber,
} from "../utils/functionUtils";
import Map from "../map/Map";
const imgPath = "http://localhost:3001/img/";
const apiURL = "http://localhost:3001/api/";

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
const StateCard = (props) => {
  const { uploadState } = props;
  return (
    <>
      {props.uploadState !== "none" ? (
        <div className={"state-container " + uploadState}>
          {uploadState === "loading" ? (
            <>
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="parr1">Asignando voluntario...</p>
            </>
          ) : uploadState === "success" ? (
            <>
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
              <p className="parr1 boldparr">¡Voluntario asignado!</p>
              <p className="parr2">Aceptar</p>
            </>
          ) : uploadState === "error" ? (
            <>
              <Warning size={32} color="var(--tertiary)" weight="light" />
              <p className="parr1 boldparr">Error</p>
              <p className="parr2">Ha ocurrido un error inesperado</p>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
const DonationDetailDisplay = (props) => {
  const { idDonacion } = props;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { volunteers } = useContext(PageContext);
  const [products, setProducts] = useState([]);
  const [donation, setDonation] = useState({});
  const [selectedVol, setSelectedVol] = useState();
  const [volunteerList, setVolunteerList] = useState([]);
  const [uploadState, setUploadState] = useState("none");
  const [location, setLocation] = useState({});

  useEffect(() => {
    setLocation({
      lat: parseFloat(donation.lat),
      lng: parseFloat(donation.lng),
    });
    console.log("aaaa", parseFloat(donation.lat), parseFloat(donation.lng));
  }, [donation]);

  console.log(donation);
  console.log("location ", location);
  useEffect(() => {
    setVolunteerList(
      volunteers.map((volunteer) => {
        return {
          value: volunteer.idvoluntario,
          label: volunteer.nombreCompleto,
          direccion: volunteer.direccion,
          celular: volunteer.celular,
        };
      })
    );
  }, []);
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
    };
    try {
      const result = await axios.post(
        apiURL + "donations/get_donation_details",
        formData
      );
      setDonation(result.data[0]);
      console.log(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const handleAssign = async () => {
    const formData = {
      idDonacion: parseInt(idDonacion),
      idVoluntario: selectedVol.value,
      aUsuario: donation.aUsuario,
    };
    console.log(formData);
    setUploadState("loading");
    try {
      const result = await axios.post(
        apiURL + "donations/assign_volunteer",
        formData
      );
      setUploadState("success");
      console.log("success");
    } catch (err) {
      console.log("Error");
      console.log(err);
      setUploadState("error");
    }
  };
  const handleOptSelection = (selected) => {
    setSelectedVol(selected);
  };
  return (
    <div className="donation-display">
      <div className="title-wrapper">
        <h4 className="title4 accent-secondary">Detalles donacion</h4>
        <div className="row-wrapper">
          <Barcode size={24} color="var(--textlight)" />
          <p className="parr1 bold  ">
            {"COD: " + padNumber(idDonacion, 6, "0")}
          </p>
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
              <Fragment key={item.idalimento}>
                <div className="product-name-container">
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
            <div className="sub-title parr1 bold">
              {donation.aUsuario ? "Receptor" : "Donante"}
            </div>
            <div className="parr1">{donation.nombreGeneral}</div>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Metodo</div>
            <div className="parr1">
              {" "}
              Envio
              {donation.tipoEnvio === "Voluntario"
                ? " con voluntario"
                : " personal"}
            </div>
          </div>
          <div className="row-wrapper">
            <div className="row-wrapper2">
              <div className="sub-title parr1 bold">Fecha</div>
              <div className="parr1">
                {getFormattedDate(donation.fechaEntrega)}
              </div>
            </div>
            <div className="row-wrapper2">
              <div className="sub-title parr1 bold">Hora</div>
              <div className="parr1">
                {getFormattedHour(donation.horaEntrega)}
              </div>
            </div>
          </div>

          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Mensaje</div>
            <p className="parr1">{donation.mensajeSolicitud}</p>
          </div>
          <div className="row-wrapper">
            <div className="sub-title parr1 bold">Direccion</div>
            <div className="parr1">{donation.lugarEntrega}</div>
          </div>

          <div className="row-wrapper">
            <div className="form-label parr1 bold accent-secondary">
              Ubicación de entrega
            </div>
          </div>
          <Map initialLocation={location} isDisabled={true} />
        </div>
      </div>
      <div>
        <h5 className="title5">Detalles Voluntario</h5>
        <div className="donations-info">
          <div>
            {!donation.idVoluntario &&
            currentUser.isAdmin &&
            donation.estado !== "Rechazado" &&
            donation.estado !== "Cancelado" &&
            donation.estado !== "Entregado" ? (
              <>
                <p className="parr1 metodo-title">
                  <span className="accent-secondary">
                    Asignar un voluntario
                  </span>
                </p>
                <div className="row-wrapper ">
                  <Select
                    className="list-option"
                    options={volunteerList}
                    components={makeAnimated()}
                    closeMenuOnSelect={true}
                    value={selectedVol}
                    defaultValue={volunteerList[2]}
                    onChange={handleOptSelection}
                    styles={listStyle}
                    placeholder={"Haz clic para seleccionar"}
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
                <button className="btn secondary-v" onClick={handleAssign}>
                  Asignar voluntario
                </button>
              </>
            ) : (
              <>
                <div className="row-wrapper">
                  <div className="sub-title parr1 bold">Nombre</div>
                  <div className="parr1">{donation.nombreVoluntario}</div>
                </div>
                <div className="row-wrapper">
                  <div className="sub-title parr1 bold">Direccion</div>
                  <div className="parr1">{donation.direccionVoluntario}</div>
                </div>
                <div className="row-wrapper">
                  <div className="sub-title parr1 bold">Celular</div>
                  <div className="parr1">{donation.celularVoluntario}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <StateCard uploadState={uploadState} />
    </div>
  );
};

export default DonationDetailDisplay;
