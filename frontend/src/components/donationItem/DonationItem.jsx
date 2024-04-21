import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlobProvider } from "@react-pdf/renderer";
import ReceiptPdf from "../receipt/ReceiptPdf";
import "./DonationItem.css";
import {
  Export,
  CalendarBlank,
  Clock,
  MapPin,
  Check,
  X,
  User,
  CheckCircle,
  XCircle,
  WarningCircle,
  LinkSimple,
  Spinner,
  ArrowsClockwise,
  UserGear,
  Barcode,
  HandArrowUp,
} from "@phosphor-icons/react";
import { AuthContext } from "../../context/authContext";
import {
  getFormattedDate,
  getFormattedHour,
  padNumber,
} from "../utils/functionUtils";
const apiPath = "http://localhost:3001/api";
const DonationPDFComponent = (props) => {
  if (props.estado === "Entregado" && props.receipt) {
    return (
      <BlobProvider
        document={
          <ReceiptPdf receipt={props.receipt[0]} products={props.products} />
        }
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
  const navigate = useNavigate();

  // Lado receptor
  const { currentUser } = useContext(AuthContext);
  const [donacion, setDonacion] = useState(props.donacion);
  const [dataReceipt, setDataReceipt] = useState({});
  let confRec = donacion.confReceptor;
  let confVol = donacion.confVoluntario;
  const isVolunteer = donacion.idVoluntario === currentUser.idusuario;
  const isReceiver = donacion.idGeneral === currentUser.idusuario;
  useEffect(() => {
    if (props.donacion && props.donacion.estado === "Entregado") {
      // console.log("fetching...");
      fetchDataReceipt();
    }
  }, []);
  const fetchDataReceipt = async () => {
    try {
      const formData = {
        idDonacion: donacion.idDonacion,
      };
      // console.log(formData);
      const result = await axios.post(
        apiPath + "/donations/find_receipt",
        formData
      );
      if (result.status === 200) {
        setDataReceipt(result.data);
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
    } else if (
      donacion.estado === "Pendiente" ||
      donacion.estado === "Confirmando"
    ) {
      if (
        currentUser.idusuario === donacion.idVoluntario ||
        currentUser.isAdmin
      ) {
        confVol = 1;
      } else if (
        currentUser.idusuario === donacion.idGeneral &&
        confVol === 1
      ) {
        confRec = 1;
      }
      nuevoEstado = "Confirmando";
      // updateConfDon();
      if (confRec === 1 && confVol === 1) {
        nuevoEstado = "Entregado";
        handleQueryInsertReceipt();
      }
    } else {
      return;
    }
    setDonacion((d) => ({
      ...d,
      estado: nuevoEstado,
      confVoluntario: confVol,
      confReceptor: confRec,
    }));
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
      idDonacion: donacion.idDonacion,
      estado: nuevoEstado,
      confVoluntario: confVol,
      confReceptor: confRec,
      idGeneral: donacion.idGeneral,
      idVoluntario: donacion.idVoluntario,
      usuarioCancela: isReceiver,
      idUsuario: currentUser.idusuario,
    };
    console.log(formData);
    axios
      .post(apiPath + "/donations/update_status", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Status uptaded");
          if (nuevoEstado === "Pendiente") {
            navigate(`/detalles/${donacion.idDonacion}`);
          }
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
      idDonacion: donacion.idDonacion,
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
        <div className="donation-data section-2">
          <div className="detail-section">
            <div className="row-wrapper">
              <Barcode size={24} color="var(--primary)" />
              <p className="parr1 ">
                {"COD: " + padNumber(donacion.idDonacion, 6, "0")}
              </p>
            </div>
            <div className="row-wrapper ">
              <Link className="link" to={`/detalles/${donacion.idDonacion}`}>
                <button className="btn bg-text-v details-btn">Detalles</button>
              </Link>
            </div>
          </div>
          <div className="row-wrapper">
            <UserGear size={24} color="var(--textlight)" weight="light" />
            <p className="parr1 single-line">{donacion.nombreVoluntario}</p>
          </div>
          <div className="row-wrapper">
            <MapPin size={24} weight="light" color="var(--secondary)" />
            <p className="parr1 single-line">{donacion.direccionVoluntario}</p>
          </div>
        </div>
        <div className="col-separator"></div>
        <div className="donation-data section-2">
          <div className="date-section">
            <div className="row-wrapper date-wrapper">
              <CalendarBlank
                size={24}
                color="var(--textlight)"
                weight="light"
              />
              <p className="parr1 ">
                {getFormattedDate(donacion.fechaEntrega)}
              </p>
            </div>
            <div className="row-wrapper date-wrapper">
              <Clock size={24} color="var(--textlight)" weight="light" />
              <p className="parr1">{getFormattedHour(donacion.horaEntrega)}</p>
            </div>
          </div>
          <div className="row-wrapper">
            {/* <User size={24} color="var(--textlight)" weight="light" /> */}
            <HandArrowUp size={24} color="var(--textlight)" weight="light" />
            <p className="parr1 single-line">{donacion.nombreGeneral}</p>
          </div>
          <div className="row-wrapper">
            <MapPin size={24} weight="light" color="var(--secondary)" />
            <p className="parr1 single-line">{donacion.direccionGeneral}</p>
          </div>
        </div>
        <div className="col-separator"></div>
        <div className="donation-data status-container">
          <div className="icon-wrapper">
            {donacion.estado === "Entregado" ? (
              <CheckCircle size={32} color="var(--secondary)" weight="light" />
            ) : donacion.estado === "Pendiente" ? (
              <ArrowsClockwise
                size={32}
                color="var(--primary)"
                weight="light"
              />
            ) : donacion.estado === "Solicitado" ? (
              <Export size={32} color="var(--textlight)" weight="light" />
            ) : donacion.estado === "Cancelado" ? (
              <XCircle size={32} color="var(--tertiary)" weight="light" />
            ) : donacion.estado === "Rechazado" ? (
              <WarningCircle size={32} color="var(--tertiary)" weight="light" />
            ) : donacion.estado === "Confirmando" ? (
              <Spinner size={32} color="var(--primary)" weight="light" />
            ) : (
              <></>
            )}
          </div>
          <p className={donacion.estado.toLowerCase() + " parr2"}>
            {donacion.estado}
          </p>
          {(donacion.estado === "Pendiente" &&
            (currentUser.isAdmin || isVolunteer)) ||
          (donacion.estado === "Solicitado" && currentUser.isAdmin) ||
          (donacion.estado === "Confirmando" &&
            !confRec &&
            isReceiver &&
            confVol) ||
          (donacion.estado === "Confirmando" &&
            !confVol &&
            (currentUser.isAdmin || isVolunteer)) ? (
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
          ) : donacion.estado === "Entregado" && dataReceipt ? (
            <DonationPDFComponent
              estado={donacion.estado}
              receipt={dataReceipt.receipt}
              products={dataReceipt.products}
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
