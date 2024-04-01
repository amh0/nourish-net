import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";

import DonationItem from "../components/donationItem/DonationItem";
import ReceiptPdf from "../components/receipt/ReceiptPdf";

import { MagnifyingGlass } from "@phosphor-icons/react";
import "./css/MisDonaciones.css";
const imgPath = "http://localhost:3001/img/";
const apiPath = "http://localhost:3001/api";
const MisDonaciones = () => {
  const [donationsData, setDonationsData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios(apiPath + "/donations/findall");

      setDonationsData(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  return (
    <div className="mis-donaciones">
      <div className="sidebar">
        <h5 className="title5">Estado</h5>
        <ol className="categories">
          <li>Todos</li>
          <li>Entregado</li>
          <li>Pendiente</li>
          <li>Solicitado</li>
          <li>Cancelado</li>
          <li>Rechazado</li>
        </ol>
        {/* <h5 className="title5">Ordenar por</h5>
        <ol>
          <li>Más cercano</li>
          <li>Más reciente</li>
          <li>Más donaciones</li>
        </ol> */}
      </div>
      <div className="donations-section">
        <div className="search-bar">
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              id="search"
              placeholder="Buscar..."
            />
          </div>
          <button className="btn secondary-v">
            <MagnifyingGlass
              size={24}
              weight="light"
              color="var(--background0)"
            />
          </button>
        </div>
        <div className="donations-list">
          <div>Recibo</div>
          <div>
            <BlobProvider document={<ReceiptPdf />}>
              {({ url, blob }) => (
                <a href={url} target="_blank" rel="noreferrer">
                  <span>Imprimir</span>
                </a>
              )}
            </BlobProvider>
          </div>
          {donationsData.map((item, i) => {
            return (
              <DonationItem
                key={i}
                donacion={item}
                nombre={item.nombre_alimento}
                imagen={imgPath + item.imagen}
                unidad_medida={item.unidad_medida}
                nombre_receptor={item.nombre_receptor}
                direccion={item.direccion_receptor}
                cantidad_donacion={item.cantidad_donacion}
                fecha_entrega={item.fecha_entrega}
                hora_entrega={item.hora_entrega}
                estado={item.estado}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MisDonaciones;
