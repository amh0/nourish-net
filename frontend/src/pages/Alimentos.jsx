import React, { useState, useEffect, useContext } from "react";
// import food_data from "../components/assets/data";
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
    label: "Fruta",
  },
  {
    value: 2,
    label: "Verdura",
  },
  {
    value: 3,
    label: "Bebida",
  },
  {
    value: 4,
    label: "Organico",
  },
  {
    value: 5,
    label: "Enlatado",
  },
  {
    value: 6,
    label: "Envasado",
  },
  {
    value: 7,
    label: "Ingrediente",
  },
  {
    value: 8,
    label: "No perecedero",
  },
  {
    value: 9,
    label: "Fresco",
  },
  {
    value: 10,
    label: "Lacteo",
  },
  {
    value: 11,
    label: "Otro",
  },
];
const fechaMenorHoy = (d2) => {
  let date1 = new Date().getTime();
  let date2 = new Date(d2).getTime();
  return date2 < date1;
};

const Alimentos = () => {
  const imgPath = "https://nourish-net-api.onrender.com/img/";
  const { currentUser } = useContext(AuthContext);

  const [foodData, setFoodData] = useState([]);
  const [filteredFood, setFilteredFood] = useState(foodData);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categoryOption, setCategoryOption] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios(
        "https://nourish-net-api.onrender.com/api/products/findall"
      );
      if (result && result.data) {
        let processedProducts = categoriesProcessing(result.data);
        setFoodData(processedProducts);
      } else {
        console.log("Error procesando productos");
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };
  const categoriesProcessing = (products) => {
    return products.map((prod) => {
      if (prod["categorias"]) {
        let arr = prod["categorias"].split(",");
        prod["categorias"] = arr.map((x) => parseInt(x));
      } else {
        prod["categorias"] = [];
      }
      return prod;
    });
  };
  // filterEffect
  useEffect(() => {
    const newData = foodData.filter((item) => {
      let filteredByCat = true;
      let filteredBySearch = true;
      if (categoryFilter && categoryFilter !== "Todos") {
        filteredByCat = item.categorias.includes(categoryOption.value);
      }
      filteredBySearch =
        search === "" ||
        item.nombre.toLowerCase().includes(search.toLowerCase());
      return (
        filteredByCat &&
        filteredBySearch &&
        item.cantidad_disponible > 0 &&
        (item.evaluacion === "Optimo" || item.evaluacion === "Excelente") &&
        !fechaMenorHoy(item.fecha_vencimiento.substr(0, 10))
      );
    });
    setFilteredFood(newData);
  }, [categoryFilter, categoryOption, search, currentUser, foodData]);

  const handleCategorySelection = (op) => {
    setCategoryFilter(op.label);
    setCategoryOption(op);
  };
  return (
    <div className="alimentos-wrapper">
      <div className="alimentos-page">
        <div className="sidebar">
          <h5 className="title5">Categorias</h5>
          <ol className="categories">
            <li
              onClick={() => {
                setCategoryFilter("Todos");
                setCategoryOption(null);
              }}
            >
              Todos
            </li>

            <li
              onClick={() => {
                setCategoryFilter("Fruta");
                setCategoryOption(filterCategories[1]);
              }}
            >
              Frutas
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Verdura");
                setCategoryOption(filterCategories[2]);
              }}
            >
              Verduras
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Bebida");
                setCategoryOption(filterCategories[3]);
              }}
            >
              Bebidas
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Organico");
                setCategoryOption(filterCategories[4]);
              }}
            >
              Organicos
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Enlatado");
                setCategoryOption(filterCategories[5]);
              }}
            >
              Enlatados
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Envasado");
                setCategoryOption(filterCategories[6]);
              }}
            >
              Envasados
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Ingrediente");
                setCategoryOption(filterCategories[7]);
              }}
            >
              Ingredientes
            </li>
            <li
              onClick={() => {
                setCategoryFilter("No Perecedero");
                setCategoryOption(filterCategories[8]);
              }}
            >
              No Perecedero
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Fresco");
                setCategoryOption(filterCategories[9]);
              }}
            >
              Fresco
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Lacteo");
                setCategoryOption(filterCategories[10]);
              }}
            >
              Lacteo
            </li>
            <li
              onClick={() => {
                setCategoryFilter("Otros");
                setCategoryOption(filterCategories[11]);
              }}
            >
              Otros
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
            {categoryFilter && categoryFilter !== "Todos" ? (
              <div className="filter-section">
                {categoryFilter !== "Todos" ? (
                  <div className="icon-container light-v">
                    <Funnel size={24} color="var(--textlight)" weight="bold" />
                  </div>
                ) : null}
                <div className="filter-container">
                  {categoryFilter !== "Todos" ? (
                    <>
                      <div className="filter-text">{categoryFilter}</div>
                      <button
                        className="btn"
                        onClick={() => {
                          setCategoryFilter("");
                          setCategoryOption(null);
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
              <p className="title7 bold">Categorias</p>
              <Select
                className="list-option"
                options={filterCategories}
                components={makeAnimated()}
                closeMenuOnSelect={false}
                value={categoryOption}
                onChange={handleCategorySelection}
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
                      eval={false}
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

export default Alimentos;
