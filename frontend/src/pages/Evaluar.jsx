import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Item from "../components/item/Item";
import { MagnifyingGlass, Funnel, X } from "@phosphor-icons/react";
import "./css/Alimentos.css";
const Evaluar = () => {
  const imgPath = "http://localhost:3001/img/";
  const { currentUser } = useContext(AuthContext);

  const [foodData, setFoodData] = useState([]);
  const [filteredFood, setFilteredFood] = useState(foodData);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  // console.log(currentUser);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3001/api/products/findall");
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
      filteredByCat = !categoryFilter || categoryFilter === "Todos";
      // item.categorias.includes(categoryFilter); // TODO filter by category
      filteredBySearch =
        search === "" ||
        item.nombre.toLowerCase().includes(search.toLowerCase());
      return filteredByCat && filteredBySearch && item.cantidad_disponible > 0;
    });
    setFilteredFood(newData);
  }, [categoryFilter, search, currentUser, foodData]);
  return (
    <div className="alimentos-wrapper">
      <div className="alimentos-page">
        <div className="sidebar">
          <h5 className="title5">Evaluación</h5>
          <ol className="categories">
            <li onClick={() => setCategoryFilter("Todos")}>Todos</li>
            <li onClick={() => setCategoryFilter("Fruta")}>Excelente</li>
            <li onClick={() => setCategoryFilter("Verdura")}>Optimo</li>
            <li onClick={() => setCategoryFilter("Bebida")}>Deficiente</li>
            <li onClick={() => setCategoryFilter("Organico")}>Error</li>
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
            <div className="filter-section">
              {categoryFilter && categoryFilter !== "Todos" ? (
                <div className="icon-container light-v">
                  <Funnel size={24} color="var(--textlight)" weight="bold" />
                </div>
              ) : null}
              <div className="filter-container">
                {categoryFilter && categoryFilter !== "Todos" ? (
                  <>
                    <div className="filter-text">{categoryFilter}</div>
                    <button
                      className="btn"
                      onClick={() => setCategoryFilter("")}
                    >
                      <X size={16} color="var(--parr1)" weight={"bold"} />
                    </button>
                  </>
                ) : null}
              </div>
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
                      evaluacion={true}
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
