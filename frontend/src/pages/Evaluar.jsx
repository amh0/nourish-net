import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../context/authContext";
import Item from "../components/item/Item";
import { MagnifyingGlass, Funnel, X } from "@phosphor-icons/react";
import "./css/Alimentos.css";
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
let filterCategories = [
  {
    value: 0,
    label: "Todos",
  },
  {
    value: 1,
    label: "Excelente",
  },
  {
    value: 2,
    label: "Optimo",
  },
  {
    value: 3,
    label: "Deficiente",
  },
  {
    value: 4,
    label: "Error",
  },
  {
    value: 5,
    label: "No evaluado",
  },
];
const Evaluar = () => {
  const imgPath = "https://nourish-net-api.onrender.com/img/";
  const { currentUser } = useContext(AuthContext);

  const [foodData, setFoodData] = useState([]);
  const [filteredFood, setFilteredFood] = useState(foodData);
  const [evaluationFilter, setEvaluationFilter] = useState("");
  const [search, setSearch] = useState("");
  const [evaluationOption, setEvaluationOption] = useState();
  // console.log(currentUser);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios(
        "https://nourish-net-api.onrender.com/api/products/findall"
      );
      setFoodData(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  // filterEffect
  useEffect(() => {
    const newData = foodData.filter((item) => {
      let filteredByCat = true;
      let filteredBySearch = true;
      filteredByCat =
        !evaluationFilter ||
        evaluationFilter === "Todos" ||
        item.evaluacion === evaluationFilter;
      filteredBySearch =
        search === "" ||
        item.nombre.toLowerCase().includes(search.toLowerCase());
      return filteredByCat && filteredBySearch;
    });
    setFilteredFood(newData);
  }, [evaluationFilter, search, currentUser, foodData]);
  const handleEvaluationOption = (op) => {
    console.log(op);
    setEvaluationFilter(op.label);
    setEvaluationOption(op);
  };
  return (
    <div className="alimentos-wrapper">
      <div className="alimentos-page">
        <div className="sidebar">
          <h5 className="title5">Evaluación</h5>
          <ol className="categories">
            <li
              onClick={() => {
                setEvaluationFilter("Todos");
                setEvaluationOption("Todos");
              }}
            >
              Todos
            </li>
            <li
              onClick={() => {
                setEvaluationFilter("Excelente");
                setEvaluationOption("Excelente");
              }}
            >
              Excelente
            </li>
            <li
              onClick={() => {
                setEvaluationFilter("Optimo");
                setEvaluationOption("Optimo");
              }}
            >
              Optimo
            </li>
            <li
              onClick={() => {
                setEvaluationFilter("Deficiente");
                setEvaluationOption("Deficiente");
              }}
            >
              Deficiente
            </li>
            <li
              onClick={() => {
                setEvaluationFilter("Error");
                setEvaluationOption("Error");
              }}
            >
              Error
            </li>
            <li
              onClick={() => {
                setEvaluationFilter("No evaluado");
                setEvaluationOption("No evaluado");
              }}
            >
              No evaluado
            </li>
          </ol>
        </div>

        <div className="products-section">
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
            {evaluationFilter && evaluationFilter !== "Todos" ? (
              <div className="filter-section">
                <div className="icon-container light-v">
                  <Funnel size={24} color="var(--textlight)" weight="bold" />
                </div>
                <div className="filter-container">
                  <>
                    <div className="filter-text">{evaluationFilter}</div>
                    <button
                      className="btn"
                      onClick={() => setEvaluationFilter("")}
                    >
                      <X size={16} color="var(--parr1)" weight={"bold"} />
                    </button>
                  </>
                </div>
              </div>
            ) : null}
          </div>
          <div className="filter-selection">
            <div className="filter-selection-wrapper">
              <p className="title7 bold">Evaluación</p>
              <Select
                className="list-option"
                options={filterCategories}
                components={makeAnimated()}
                closeMenuOnSelect={false}
                value={evaluationOption}
                onChange={handleEvaluationOption}
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
          <div className="products-list">
            {filteredFood && filteredFood.length > 0
              ? filteredFood.map((item, i) => {
                  return (
                    <Item
                      key={item.idalimento}
                      idalimento={item.idalimento}
                      nombre={item.nombre}
                      desc={item.descripcion}
                      cantidad={item.cantidad_disponible}
                      unidad_medida={item.unidad_medida}
                      imagen={imgPath + item.imagen}
                      direccion={item.direccion_don}
                      eval={true}
                      evaluacion={item.evaluacion}
                      nombreVoluntario={item.nombreVoluntario}
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

export default Evaluar;
