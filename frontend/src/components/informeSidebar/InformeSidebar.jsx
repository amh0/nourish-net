import React, { useEffect, useState } from "react";
import "./InformeSidebar.css";
import { ForkKnife, HandHeart, User } from "@phosphor-icons/react";
import axios from "axios";

const InformeSidebar = ({ userType }) => {
  const sizeIcon = 35;
  const [selectedItem, setSelectedItem] = useState("Usuarios");
  const [cantidad, setCantidad] = useState(null);

  useEffect(() => {
    const obtenerCantidad = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/reports/contarMDA"
        );
        setCantidad(response.data);
      } catch (error) {
        console.error("Error al obtener la cantidad:", error);
      }
    };
    obtenerCantidad();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    userType(item);
  };

  const menuItems = ["Usuarios", "Alimentos", "Donaciones"];

  return (
    <div>
      <div className="menu-text">
        <div className="cell">
          <User size={sizeIcon} color="#222222" weight="thin" />
          <div className="info">
            <div>
              <strong>Miembros</strong>
            </div>
            {cantidad && cantidad.nrMiem ? cantidad.nrMiem : "0"}
          </div>
        </div>
        <div className="cell">
          <HandHeart size={sizeIcon} color="#222222" weight="thin" />
          <div className="info">
            <div>
              <strong>Entregadas</strong>
            </div>
            {cantidad && cantidad.nrDon ? cantidad.nrDon : "0"}
          </div>
        </div>
        <div className="cell">
          <ForkKnife size={sizeIcon} color="#222222" weight="thin" />
          <div className="info">
            <div>
              <strong>Alimentos</strong>
            </div>
            <div>{cantidad && cantidad.nrAlim ? cantidad.nrAlim : "0"}</div>
          </div>
        </div>
      </div>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={selectedItem === item ? "active" : ""}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformeSidebar;
