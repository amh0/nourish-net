import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  MagnifyingGlass,
  X,
  Funnel,
  HandHeart,
  HandArrowUp,
  HandArrowDown,
} from "@phosphor-icons/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { AuthContext } from "../context/authContext";
import DonationItem from "../components/donationItem/DonationItem";
import "./css/MisDonaciones.css";

const apiPath = "https://nourish-net-api.onrender.com/api";
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
let typeFilterList = [
  {
    value: 0,
    label: "Todos",
  },
  {
    value: 1,
    label: "Donado",
  },
  {
    value: 2,
    label: "Recibido",
  },
];
let statusFilterList = [
  {
    value: 0,
    label: "Todos",
  },
  {
    value: 1,
    label: "Entregado",
  },
  {
    value: 2,
    label: "Confirmando",
  },
  {
    value: 3,
    label: "Pendiente",
  },
  {
    value: 4,
    label: "Solicitado",
  },
  {
    value: 5,
    label: "Cancelado",
  },
  {
    value: 6,
    label: "Rechazado",
  },
];
const DonacionesVoluntario = () => {
  const { currentUser } = useContext(AuthContext);
  const [donationsData, setDonationsData] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState(donationsData);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [statusOption, setStatusOption] = useState();
  const [typeOption, setTypeOption] = useState();
  console.log("donaciones entregas");
  useEffect(() => {
    getAllDonations();
  }, []);
  const getAllDonations = async () => {
    try {
      const result = await axios.post(apiPath + "/donations/find_by_user", {
        idUsuario: currentUser.idusuario,
        assignedDonations: true,
      });
      setDonationsData(result.data);
      console.log("donaciones voluntario");
      console.log(result.data);
      console.log("donaciones voluntario");
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
      if (typeFilter === "Donado") {
        // donaciones hechas al banco de alimentos
        filteredByType = !donation.aUsuario;
      } else if (typeFilter === "Recibido") {
        // donaciones solicitadas al banco
        filteredByType = donation.aUsuario;
      } else {
        // obtener donados y recibidos o todos las donaciones si es admin
        filteredByType =
          currentUser.isAdmin ||
          donation.idVoluntario === currentUser.idusuario;
      }
      // if (typeFilter === "Donado") {
      //   filteredByType = donation.id_donante === currentUser.idusuario;
      // } else if (typeFilter === "Recibido")
      //   filteredByType = donation.id_receptor === currentUser.idusuario;
      // else {
      // obtener donados y recibidos o todos las donaciones si es admin
      // filteredByType =
      //   currentUser.isAdmin || donation.idVoluntario === currentUser.idusuario;
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
    console.log("filetered", newData);
    setFilteredDonations(newData);
  }, [statusFilter, typeFilter, search, currentUser, donationsData]);

  const handleStatusSelection = (op) => {
    setStatusFilter(op.label);
    setStatusOption(op);
  };
  const handleTypeSelection = (op) => {
    setTypeFilter(op.label);
    setTypeOption(op);
  };
  const handleMenuSelection = (filter, op) => {
    if (filter === "tipo") {
      setTypeFilter(typeFilterList[op].label);
      setTypeOption(typeFilterList[op]);
    } else if (filter === "estado") {
      setStatusFilter(statusFilterList[op].label);
      setStatusOption(statusFilterList[op]);
    }
  };
  return (
    <div className="donations-wrapper">
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
                <HandArrowUp
                  size={24}
                  weight="light"
                  color="var(--primary_strong)"
                />
                Donado
              </div>
            </li>
            <li onClick={() => setTypeFilter("Recibido")}>
              <div className="icon-text-wrapper">
                <HandArrowDown
                  size={24}
                  weight="light"
                  color="var(--secondary)"
                />
                Recibido
              </div>
            </li>
          </ol>
          <h5 className="title5 accent-secondary">Estado</h5>
          <ol className="categories">
            <li onClick={() => handleMenuSelection("estado", 0)}>Todos</li>
            <li onClick={() => handleMenuSelection("estado", 1)}>Entregado</li>
            <li onClick={() => handleMenuSelection("estado", 2)}>
              Confirmando
            </li>
            <li onClick={() => handleMenuSelection("estado", 3)}>Pendiente</li>
            <li onClick={() => handleMenuSelection("estado", 4)}>Solicitado</li>
            <li onClick={() => handleMenuSelection("estado", 5)}>Cancelado</li>
            <li onClick={() => handleMenuSelection("estado", 6)}>Rechazado</li>
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
            {(statusFilter && statusFilter !== "Todos") ||
            (typeFilter && typeFilter !== "Todos") ? (
              <div className="filter-section">
                <div className="icon-container light-v">
                  <Funnel size={24} color="var(--textlight)" weight="bold" />
                </div>
                <div className="filter-container">
                  {typeFilter && typeFilter !== "Todos" ? (
                    <>
                      <div className="filter-text">{typeFilter}</div>
                      <button
                        className="btn"
                        onClick={() => {
                          setTypeFilter("");
                          setTypeOption(null);
                        }}
                      >
                        <X size={16} color="var(--parr1)" weight={"bold"} />
                      </button>
                    </>
                  ) : null}
                </div>
                <div className="filter-container">
                  {statusFilter && statusFilter !== "Todos" ? (
                    <>
                      <div className="filter-text">{statusFilter}</div>
                      <button
                        className="btn"
                        onClick={() => {
                          setStatusFilter("");
                          setStatusOption(null);
                        }}
                      >
                        <X size={16} color="var(--parr1)" weight={"bold"} />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <div className="filter-selection">
            <div className="filter-selection-wrapper">
              <p className="title7 bold">Tipo:</p>
              <Select
                className="list-option"
                options={typeFilterList}
                components={makeAnimated()}
                closeMenuOnSelect={false}
                value={typeOption}
                onChange={handleTypeSelection}
                styles={listStyle}
                placeholder={"Seleccione"}
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
            <div className="filter-selection-wrapper">
              <p className="title7 bold">Estado:</p>
              <Select
                className="list-option"
                options={statusFilterList}
                components={makeAnimated()}
                closeMenuOnSelect={false}
                value={statusOption}
                onChange={handleStatusSelection}
                styles={listStyle}
                placeholder={"Seleccione"}
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
          <div className="donations-list">
            {filteredDonations && filteredDonations.length > 0
              ? filteredDonations.map((item) => {
                  return (
                    <DonationItem
                      key={item.idDonacion}
                      donacion={item}
                      dePaginaTareas={true}
                    />
                  );
                })
              : "No se encontraron resultados..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonacionesVoluntario;
