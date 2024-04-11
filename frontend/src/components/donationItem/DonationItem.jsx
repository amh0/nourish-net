import React, { useContext, useEffect, useState } from "react";
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
  HandArrowDown,
  HandArrowUp,
  Spinner,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { AuthContext } from "../../context/authContext";
import { getFormattedDate, getFormattedHour } from "../utils/functionUtils";
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
  const { currentUser } = useContext(AuthContext);
  const [donacion, setDonacion] = useState(props.donacion);
  const [dataReceipt, setDataReceipt] = useState({});
  const [isDonated, setIsDonated] = useState();
  let confRec = donacion.conf_receptor;
  let confDon = donacion.conf_donante;
  useEffect(() => {
    setIsDonated(currentUser.idusuario === donacion.id_donante);
  }, [donacion, currentUser]);

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
    } else if (
      donacion.estado === "Pendiente" ||
      donacion.estado === "Confirmando"
    ) {
      if (isDonated) {
        confDon = 1;
      } else {
        confRec = 1;
      }
      nuevoEstado = "Confirmando";
      // updateConfDon();
      if (confDon === 1 && confRec === 1) {
        nuevoEstado = "Entregado";
        handleQueryInsertReceipt();
      }
    } else {
      return;
    }
    setDonacion((d) => ({
      ...d,
      estado: nuevoEstado,
      conf_donante: confDon,
      conf_receptor: confRec,
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
      iddonacion: donacion.iddonacion,
      estado: nuevoEstado,
      conf_donante: confDon,
      conf_receptor: confRec,
      idalimento: donacion.idalimento,
      cantidad_donacion: donacion.cantidad_donacion,
    };
    axios
      .post(apiPath + "/donations/update_status", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Status uptaded");
          setDonacion((d) => ({ ...d, ...res.data }));
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
          <p className="parr1 bold">{" " + donacion.nombre_alimento}</p>
          <div className="row-wrapper">
            {isDonated ? (
              <HandArrowUp size={24} weight="light" color="var(--secondary)" />
            ) : (
              <HandArrowDown
                size={24}
                weight="light"
                color="var(--primary_strong)"
              />
            )}
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
            <p className="parr1 single-line">
              {isDonated ? donacion.nombre_rec : donacion.nombre_don}
            </p>
          </div>
          <div className="row-wrapper">
            <MapPin size={24} weight="light" color="var(--secondary)" />
            <p className="parr1 single-line">
              {isDonated ? donacion.direccion_rec : donacion.direccion_don}
            </p>
          </div>
          <div className="date-section">
            <div className="row-wrapper date-wrapper">
              <CalendarBlank
                size={24}
                color="var(--textlight)"
                weight="light"
              />
              <p className="parr1 ">
                {getFormattedDate(donacion.fecha_entrega)}
              </p>
            </div>
            <div className="row-wrapper date-wrapper">
              <Clock size={24} color="var(--textlight)" weight="light" />
              <p className="parr1">{getFormattedHour(donacion.hora_entrega)}</p>
            </div>
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
          {donacion.estado === "Pendiente" ||
          (donacion.estado === "Solicitado" && currentUser.isAdmin) ||
          (donacion.estado === "Confirmando" && !confRec && !isDonated) ||
          (donacion.estado === "Confirmando" && !confDon && isDonated) ? (
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
