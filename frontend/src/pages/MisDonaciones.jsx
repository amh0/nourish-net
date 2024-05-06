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

const apiPath = "http://localhost:3001/api";
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
const MisDonaciones = () => {
  const { currentUser } = useContext(AuthContext);
  const [donationsData, setDonationsData] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState(donationsData);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [statusOption, setStatusOption] = useState();
  useEffect(() => {
    getAllDonations();
  }, []);
  const getAllDonations = async () => {
    try {
      let result = [];
      if (currentUser.isAdmin) {
        result = await axios(apiPath + "/donations/findall");
      } else {
        result = await axios.post(apiPath + "/donations/find_by_user", {
          idUsuario: currentUser.idusuario,
          assignedDonations: false,
        });
      }
      setDonationsData(result.data);
      // setFilteredDonations(result.data);
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
      }
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
  }, [statusFilter, typeFilter, search, currentUser, donationsData]);

  const handleStatusSelection = (op) => {
    console.log(op);
    setStatusFilter(op.label);
    setStatusOption(op);
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
            {(statusFilter && statusFilter !== "Todos") ||
            (typeFilter && typeFilter !== "Todos") ? (
              <div className="filter-section">
                {statusFilter && statusFilter !== "Todos" ? (
                  <div className="icon-container light-v">
                    <Funnel size={24} color="var(--textlight)" weight="bold" />
                  </div>
                ) : null}
                <div className="filter-container">
                  {typeFilter && typeFilter !== "Todos" ? (
                    <>
                      <div className="filter-text">{typeFilter}</div>
                      <button className="btn" onClick={() => setTypeFilter("")}>
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
            ) : (
              <></>
            )}
          </div>

          <div className="filter-selection">
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
    </div>
  );
};

export default MisDonaciones;
