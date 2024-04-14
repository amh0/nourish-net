import React, { useEffect, useState, useContext, usefo } from "react";
import axios from "axios";
import {
  MagnifyingGlass,
  X,
  Funnel,
  HandArrowUp,
  HandArrowDown,
  HandHeart,
} from "@phosphor-icons/react";

import { AuthContext } from "../context/authContext";
import DonationItem from "../components/donationItem/DonationItem";
import "./css/MisDonaciones.css";

const apiPath = "http://localhost:3001/api";
const MisDonaciones = () => {
  const { currentUser } = useContext(AuthContext);
  const [donationsData, setDonationsData] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState(donationsData);
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllDonations2();
  }, []);
  const getAllDonations2 = async () => {
    try {
      let result = [];
      if (currentUser.isAdmin) {
        result = await axios(apiPath + "/donations/findall");
      } else {
        console.log(currentUser.idusuario);
        result = await axios.post(apiPath + "/donations/find_by_user", {
          idUsuario: currentUser.idusuario,
          isVolunteer: currentUser.isVolunteer,
        });
      }
      setDonationsData(result.data);
      // setFilteredDonations(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const getAllDonations = async () => {
    try {
      const result = await axios(apiPath + "/donations/findall");
      setDonationsData(result.data);
      //setFilteredDonations(result.data);
      // console.log("fetching...");
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  // filterEffect
  useEffect(() => {
    const newData = donationsData.filter((donation) => {
      let filteredByType = true;
      let filteredByStatus = true;
      let filteredBySearch = true;
      // if (typeFilter === "Donado") {
      //   filteredByType = donation.id_donante === currentUser.idusuario;
      // } else if (typeFilter === "Recibido")
      //   filteredByType = donation.id_receptor === currentUser.idusuario;
      // else {
      // obtener donados y recibidos o todos las donaciones si es admin
      filteredByType =
        currentUser.isAdmin ||
        donation.idVoluntario === currentUser.idusuario ||
        donation.idGeneral === currentUser.idusuario;
      // }
      filteredByStatus =
        !statusFilter ||
        statusFilter === "Todos" ||
        donation.estado === statusFilter;
      filteredBySearch =
        search === "" ||
        donation.nombreGeneral.toLowerCase().includes(search.toLowerCase());

      return filteredByType && filteredByStatus && filteredBySearch;
    });
    // console.log(newData);
    setFilteredDonations(newData);
  }, [typeFilter, statusFilter, search, currentUser, donationsData]);

  return (
    <div className="mis-donaciones">
      <div className="sidebar">
        <h5 className="title5 accent-secondary">Tipo</h5>
        <ol className="categories">
          <li onClick={() => setTypeFilter("Todos")}>
            <div className="icon-text-wrapper">
              <HandHeart size={24} weight="light" color="var(--textlight)" />
              Todos
            </div>
          </li>
          <li onClick={() => setTypeFilter("Donado")}>
            <div className="icon-text-wrapper">
              <HandArrowUp size={24} weight="light" color="var(--secondary)" />
              Donado
            </div>
          </li>
          <li onClick={() => setTypeFilter("Recibido")}>
            <div className="icon-text-wrapper">
              <HandArrowDown
                size={24}
                weight="light"
                color="var(--primary_strong)"
              />
              Recibido
            </div>
          </li>
        </ol>
        <h5 className="title5 accent-secondary">Estado</h5>
        <ol className="categories">
          <li onClick={() => setStatusFilter("Todos")}>Todos</li>
          <li onClick={() => setStatusFilter("Entregado")}>Entregado</li>
          <li onClick={() => setStatusFilter("Confirmando")}>Confirmando</li>
          <li onClick={() => setStatusFilter("Pendiente")}>Pendiente</li>
          <li onClick={() => setStatusFilter("Solicitado")}>Solicitado</li>
          <li onClick={() => setStatusFilter("Cancelado")}>Cancelado</li>
          <li onClick={() => setStatusFilter("Rechazado")}>Rechazado</li>
        </ol>
      </div>
      <div className="donations-section">
        <div className="filter-wrapper">
          <div className="search-bar">
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                id="search"
                placeholder="Buscar..."
                onChange={(e) => setSearch(e.target.value)}
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
          <div className="filter-section">
            {(typeFilter &&
              (typeFilter === "Donado" || typeFilter === "Recibido")) ||
            (statusFilter && statusFilter !== "Todos") ? (
              <div className="icon-container light-v">
                <Funnel size={24} color="var(--textlight)" weight="bold" />
              </div>
            ) : null}
            <div className="filter-container">
              {typeFilter &&
              (typeFilter === "Donado" || typeFilter === "Recibido") ? (
                <>
                  <div className="filter-text">{typeFilter}</div>
                  <button className="btn" onClick={() => setTypeFilter("")}>
                    <X size={16} color="var(--parr1)" weight={"bold"} />
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="filter-container">
              {statusFilter && statusFilter !== "Todos" ? (
                <>
                  <div className="filter-text">{statusFilter}</div>
                  <button className="btn" onClick={() => setStatusFilter("")}>
                    <X size={16} color="var(--parr1)" weight={"bold"} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="donations-list">
          {filteredDonations && filteredDonations.length > 0
            ? filteredDonations.map((item) => {
                return <DonationItem key={item.idDonacion} donacion={item} />;
              })
            : "No se encontraron resultados..."}
        </div>
      </div>
    </div>
  );
};

export default MisDonaciones;
