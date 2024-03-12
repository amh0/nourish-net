import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo_64.png";
const NavBar = () => {
  const [menu, setMenu] = useState("inicio");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>NourishNet</p>
      </div>

      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("inicio");
          }}
        >
          <Link className="link" to="/">
            Inicio
          </Link>
          {menu === "inicio" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("nosotros");
          }}
        >
          <Link className="link" to="/nosotros">
            Nosotros
          </Link>
          {menu === "nosotros" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contacto");
          }}
        >
          <Link className="link" to="/contacto">
            Contacto
          </Link>
          {menu === "contacto" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("preguntas");
          }}
        >
          <Link className="link" to="/faq">
            Preguntas Frecuentes
          </Link>
          {menu === "preguntas" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login">
        <Link className="link" to="/login">
          <button className="btn bg0-secondary-v">Iniciar Sesion</button>
        </Link>
        <Link className="link" to="/signup">
          <button className="btn secondary-v">Registro</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
