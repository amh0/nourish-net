import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider } from "@react-pdf/renderer";
import ReceiptPdf from "../receipt/ReceiptPdf";
import "./DonationItem.css";
import {
  Export,
  Cube,
  CalendarBlank,
  Clock,
  MapPin,
  Check,
  X,
  User,
  CheckCircle,
  ArrowClockwise,
  XCircle,
  WarningCircle,
  LinkSimple,
} from "@phosphor-icons/react";
const imgPath = "http://localhost:3001/img/";
const apiPath = "http://localhost:3001/api";
const DonationPDFComponent = (props) => {
  if (props.estado === "Entregado" && props.receipt) {
    return (
      <BlobProvider
        document={<ReceiptPdf receipt={props.receipt} />}
        fileName="recibo"
      >
        {({ url, blob }) => (
          <div className="btn secondary-v pdf-button">
            <a href={url} target="_blank" rel="noreferrer" className="btn-link">
              <span>Recibo</span>
            </a>
            <LinkSimple size={16} color="var(--background0)" />
          </div>
        )}
      </BlobProvider>
    );
  } else {
    return <div>Cargando...</div>;
  }
};
const DonationItem = (props) => {
  // Lado donante
  const [donacion, setDonacion] = useState(props.donacion);
  const [dataReceipt, setDataReceipt] = useState({});
  useEffect(() => {
    fetchDataReceipt();
  }, []);
  const fetchDataReceipt = async () => {
    try {
      const formData = {
        iddonacion: donacion.iddonacion,
      };
      // console.log(formData);
      const result = await axios.post(
        apiPath + "/donations/find_receipt",
        formData
      );
      if (result.status === 200) {
        // console.log("data  " + result.data[0]);
        setDataReceipt(result.data[0]);
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  let nuevoEstado = donacion.estado;
  const handleAccept = () => {
    nuevoEstado = "";
    if (donacion.estado === "Solicitado") {
      nuevoEstado = "Pendiente";
    } else if (donacion.estado === "Pendiente") {
      nuevoEstado = "Entregado";
      handleQueryInsertReceipt();
    } else {
      return;
    }
    setDonacion((d) => ({ ...d, estado: nuevoEstado }));
    handleQuery();
  };
  const handleDeny = () => {
    if (donacion.estado === "Solicitado") {
      nuevoEstado = "Rechazado";
    } else if (donacion.estado === "Pendiente") {
      nuevoEstado = "Cancelado";
    } else {
      return;
    }
    setDonacion((d) => ({ ...d, estado: nuevoEstado }));
    handleQuery();
  };
  const handleQuery = () => {
    const formData = {
      iddonacion: donacion.iddonacion,
      estado: nuevoEstado,
    };
    axios
      .post(apiPath + "/donations/update_status", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Status uptaded");
        } else {
          console.log("An error has occurred");
          // setInsertState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleQueryInsertReceipt = () => {
    const formData = {
      fecha: new Date().toJSON(),
      nota: "Nota del recibo",
      iddonacion: donacion.iddonacion,
    };
    console.log(formData);
    axios
      .post(apiPath + "/donations/insert_receipt", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Receipt inserted");
          // console.log(res.data);
          // console.log("recibo :", res.data);
          fetchDataReceipt();
        } else {
          console.log("Error insert Receipt");
          // setInsertState("error");
        }
      })
      .catch((err) => console.log(err));
  };
  if (
    (donacion.estado === "entregado" && dataReceipt) ||
    donacion.estado !== "entregado"
  ) {
    return (
      <div className="donation-item">
        <div className="img-container">
          <img src={imgPath + donacion.img_alimento} alt="" />
        </div>
        <div className="donation-data section-1">
          <p className="parr1 bold">{donacion.nombre_alimento}</p>
          <div className="row-wrapper">
            <Cube size={24} weight="light" color="var(--textlight)" />
            <p className="parr1 ">
              {donacion.cantidad_donacion + " " + donacion.unidad_medida}{" "}
            </p>
          </div>
        </div>
        <div className="col-separator"></div>
        <div className="donation-data section-2">
          <div className="row-wrapper">
            <User size={24} color="var(--textlight)" weight="light" />
            <p className="parr1 single-line">{donacion.nombre_rec}</p>
          </div>
          <div className="row-wrapper">
            <MapPin size={24} weight="light" color="var(--secondary)" />
            <p className="parr1 single-line">{donacion.direccion_rec}</p>
          </div>
          <div className="date-section">
            <div className="row-wrapper date-wrapper">
              <CalendarBlank
                size={24}
                color="var(--textlight)"
                weight="light"
              />
              <p className="parr1 ">
                {new Date(donacion.fecha_entrega).toLocaleDateString("es-BO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="row-wrapper date-wrapper">
              <Clock size={24} color="var(--textlight)" weight="light" />
              <p className="parr1">{donacion.hora_entrega}</p>
            </div>
          </div>
        </div>
        <div className="col-separator"></div>
        <div className="donation-data status-container">
          <div className="icon-wrapper">
            {donacion.estado === "Entregado" ? (
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
            ) : donacion.estado === "Pendiente" ? (
              <ArrowClockwise size={32} color="var(--primary)" weight="light" />
            ) : donacion.estado === "Solicitado" ? (
              <Export size={32} color="var(--textlight)" weight="light" />
            ) : donacion.estado === "Cancelado" ? (
              <XCircle size={32} color="var(--tertiary)" weight="light" />
            ) : donacion.estado === "Rechazado" ? (
              <WarningCircle size={32} color="var(--tertiary)" weight="light" />
            ) : (
              <></>
            )}
          </div>
          <p className={donacion.estado.toLowerCase() + " parr2"}>
            {donacion.estado}
          </p>
          {donacion.estado === "Pendiente" ||
          donacion.estado === "Solicitado" ? (
            <div className="row-wrapper">
              <button className="btn secondary-v">
                <Check
                  size={16}
                  color="var(--background0)"
                  weight="regular"
                  onClick={handleAccept}
                />
              </button>
              <button className="btn tertiary-v">
                <X
                  size={16}
                  color="var(--background0)"
                  weight="regular"
                  onClick={handleDeny}
                />
              </button>
            </div>
          ) : donacion.estado === "Entregado" ? (
            <DonationPDFComponent
              estado={donacion.estado}
              receipt={dataReceipt}
            />
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DonationItem;
