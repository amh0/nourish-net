import React from "react";
import data_food from "../components/assets/data";
import Item from "../components/item/Item";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./Alimentos.css";
const Alimentos = () => {
  return (
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
              class="input"
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
          {data_food.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                nombre={item.nombre}
                desc={item.descripcion}
                cantidad={item.cantidad}
                unidad_medida={item.unidad_medida}
                imagen={item.imagen}
                ubicacion={item.ubicacion}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alimentos;
