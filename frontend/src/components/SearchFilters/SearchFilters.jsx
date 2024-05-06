import React, { useEffect, useState } from "react";
import Select from "react-select";
import Input from "../input/Input";
import "./SearchFilters.css";
const SearchFilters = ({ onSearchFiltersData, userType }) => {
  const [inputData, setInputData] = useState({});

  const handleFechaInicialChange = (e) => {
    setInputData({
      ...inputData,
      fechaInicial: e.target.value,
      fechaFinal: e.target.value,
    });
  };

  const handleSearchClick = () => {
    onSearchFiltersData(inputData);
  };

  const handleFilterChange = (selectedOption, selector) => {
    setInputData({
      ...inputData,
      [selector]: selectedOption.value,
    });
    if (selector === "firstSelectValue") {
      setDefaultFirtSelect(selectedOption);
    } else if (selector === "secondSelectValue") {
      setDefaultSecondSelect(selectedOption);
    }
  };

  let filters = null;
  let placeholderText = "";
  let selectOptions = [];
  let secondSelectOptions = [];
  let firstSelectText = "Select:";
  let secondSelectText = "Select:";

  const listStyle = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#E2F0E8",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        cursor: "pointer",
        backgroundColor: "#E2F0E8",
      };
    },
  };

  if (userType === "Usuarios") {
    selectOptions = [
      { value: "administradores", label: "Administradores" },
      { value: "voluntarios", label: "Voluntarios" },
      { value: "donadores", label: "Donadores" },
      { value: "receptores", label: "Receptores" },
      { value: "", label: "Todos" },
    ];
    secondSelectOptions = [
      { value: "organizacion", label: "Organizaciones" },
      { value: "usuario individual", label: "Usuario Individual" },
      { value: "", label: "Todos" },
    ];
    placeholderText = "Buscar por ID, nombre o correo";
    firstSelectText = "Roles de Usuario:";
    secondSelectText = "Filtrar Usuario:";
  } else if (userType === "Alimentos") {
    selectOptions = [
      { value: "disponible", label: "Disponible" },
      { value: "agotado", label: "Agotado" },
      { value: "", label: "Todos" },
    ];
    secondSelectOptions = [
      { value: "vencido", label: "Vencido" },
      { value: "no-vencido", label: "Producto No Vencido" },
      { value: "", label: "Todos" },
    ];
    placeholderText = "Buscar por nombre de alimento o ID";
    firstSelectText = "Estado:";
    secondSelectText = "Vencimiento del alimento:";
  } else if (userType === "Donaciones") {
    selectOptions = [
      { value: "personal", label: "Personal" },
      { value: "voluntario", label: "Voluntario" },
      { value: "", label: "Todos" },
    ];
    secondSelectOptions = [
      { value: "solicitado", label: "Solicitado" },
      { value: "pendiente", label: "Pendiente" },
      { value: "entregado...", label: "Entregado..." },
      { value: "entregado", label: "Entregado" },
      { value: "cancelado", label: "Cancelado" },
      { value: "rechazado", label: "Rechazado" },
      { value: "", label: "Todos" },
    ];
    placeholderText = "Buscar...";
    firstSelectText = "Tipo envío:";
    secondSelectText = "Estado de entrega:";
  }

  const [defaultFirtSelect, setDefaultFirtSelect] = useState(
    selectOptions[selectOptions.length - 1]
  );
  const [defaultSecondSelect, setDefaultSecondSelect] = useState(
    secondSelectOptions[secondSelectOptions.length - 1]
  );

  const handleClearClick = () => {
    setInputData({});
    onSearchFiltersData({});
    setDefaultFirtSelect(selectOptions[selectOptions.length - 1]);
    setDefaultSecondSelect(secondSelectOptions[secondSelectOptions.length - 1]);
  };

  useEffect(() => {
    setInputData({});
    setDefaultFirtSelect(selectOptions[selectOptions.length - 1]);
    setDefaultSecondSelect(secondSelectOptions[secondSelectOptions.length - 1]);
  }, [userType]);

  filters = (
    <div>
      <div className="container-select">
        <div className="select-wrapper">
          <span>{firstSelectText}</span>
          <Select
            options={selectOptions}
            value={defaultFirtSelect}
            // defaultValue={selectOptions[selectOptions.length - 1]}
            onChange={(selectedOption) =>
              handleFilterChange(selectedOption, "firstSelectValue")
            }
            styles={listStyle}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
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
        {defaultFirtSelect.value !== "voluntarios" &&
          defaultFirtSelect.value !== "administradores" &&
          secondSelectOptions.length > 0 && (
            <div className="select-wrapper">
              <span>{secondSelectText}</span>
              <Select
                options={secondSelectOptions}
                value={defaultSecondSelect}
                onChange={(selectedOption) =>
                  handleFilterChange(selectedOption, "secondSelectValue")
                }
                styles={listStyle}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  colors: {
                    ...theme.colors,
                    text: "orangered",
                    primary25: "#E2F0EE",
                    primary50: "#99CBC5",
                    primary: "#red",
                  },
                })}
                isDisabled={defaultFirtSelect.value === "voluntarios"}
              />
            </div>
          )}
      </div>
      {userType === "Alimentos" && (
        <div className="container-date">
          <span>Fecha de publicación:</span>
          <div className="btndate">
            <Input
              type="date"
              value={inputData.fechaInicial || ""}
              onChange={handleFechaInicialChange}
              placeholder="Fecha Inicio"
            />
          </div>

          <span> - </span>
          <div className="btndate">
            <Input
              type="date"
              value={inputData.fechaFinal || ""}
              min={inputData.fechaInicial}
              onChange={(e) =>
                setInputData({ ...inputData, fechaFinal: e.target.value })
              }
              placeholder="Fecha Fin"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="search-filters">
      {filters}
      <div className="container-select">
        <div className="filter-wrapper">
          <Input
            type="text"
            value={inputData.buscar || ""}
            onChange={(e) =>
              setInputData({ ...inputData, buscar: e.target.value })
            }
            placeholder={placeholderText}
          />
        </div>
        <button
          style={{ backgroundColor: "var(--secondary)" }}
          onClick={handleSearchClick}
        >
          Buscar
        </button>

        <button
          style={{ backgroundColor: "var(--tertiary_strong)" }}
          onClick={handleClearClick}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
