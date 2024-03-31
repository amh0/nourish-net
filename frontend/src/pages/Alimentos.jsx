import React, { useState, useEffect } from "react";
// import food_data from "../components/assets/data";
import Item from "../components/item/Item";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./css/Alimentos.css";
import axios from "axios";
const Alimentos = () => {
  const imgPath = "http://localhost:3001/img/";
  const [foodData, setFoodData] = useState([]);
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
  // console.log(foodData);
  return (
    <div className="alimentos-wrapper">
      <div className="alimentos-page">
        <div className="sidebar">
          <h5 className="title5">Categorias</h5>
          <ol className="categories">
            <li>Frutas</li>
            <li>Verduras</li>
            <li>Cereales</li>
            <li>Bebidas</li>
            <li>Orgánicos</li>
            <li>Enlatados</li>
            <li>Envasados</li>
            <li>Otros</li>
          </ol>
          {/* <h5 className="title5">Ordenar por</h5>
        <ol>
          <li>Más cercano</li>
          <li>Más reciente</li>
          <li>Más donaciones</li>
        </ol> */}
        </div>

        <div className="products-section">
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
          <div className="products-list">
            {foodData.map((item, i) => {
              return (
                <Item
                  key={i}
                  idalimento={item.idalimento}
                  nombre={item.nombre}
                  desc={item.descripcion}
                  cantidad={item.cantidad}
                  unidad_medida={item.unidad_medida}
                  imagen={imgPath + item.imagen}
                  direccion={item.direccion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alimentos;
