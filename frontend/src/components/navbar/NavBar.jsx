import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { List } from "phosphor-react";
import logo from "../assets/logo_64.png";
import Dropdown from "../dropdown/Dropdown";
const NavBar = () => {
  const [dropDown, setDropdown] = useState(false);
  const [menu, setMenu] = useState("inicio");
  const changeDropdown = () => {
    setDropdown((prev) => !prev);
  };
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
          {menu === "inicio" ? (
            <hr className="bar-primary" />
          ) : (
            <hr className="bar-white" />
          )}
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
        <li
          onClick={() => {
            setMenu("alimentos");
          }}
        >
          <Link className="link" to="/alimentos">
            Alimentos
          </Link>
          {menu === "alimentos" ? <hr /> : <></>}
        </li>
        {/* <li
          onClick={() => {
            setMenu("donar");
          }}
        >
          <Link className="link" to="/donar">
            Donar
          </Link>
          {menu === "donar" ? <hr /> : <></>}
        </li> */}
      </ul>
      <div className="nav-login">
        <Link className="link" to="/login">
          <button
            className="btn bg0-secondary-v"
            onClick={() => {
              setMenu("");
            }}
          >
            Iniciar Sesion
          </button>
        </Link>
        <Link className="link" to="/signup">
          <button
            className="btn secondary-v"
            onClick={() => {
              setMenu("");
            }}
          >
            Registro
          </button>
        </Link>
        <div className="dropdown-container">
          <div className="list-menu" onClick={changeDropdown}>
            <List size={30} color="var(--textlight)" />
          </div>
          {dropDown && <Dropdown type="default" />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
