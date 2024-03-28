import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "phosphor-react";
import "./ProfileNavbar.css";
import logo from "../assets/logo_64.png";
import perfil from "../assets/perfil.jpg";
const ProfileNavbar = () => {
  const [menu, setMenu] = useState("inicio");
  return (
    <div className="profile-navbar">
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
        {/* <li
          onClick={() => {
            setMenu("donantes");
          }}
        >
          <Link className="link" to="/donantes">
            Donantes
          </Link>
          {menu === "donantes" ? <hr /> : <></>}
        </li> */}

        <li
          onClick={() => {
            setMenu("misDonaciones");
          }}
        >
          <Link className="link" to="/mis-donaciones">
            Mis donaciones
          </Link>
          {menu === "misDonaciones" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("peticiones");
          }}
        >
          <Link className="link" to="/peticiones">
            Peticiones
          </Link>
          {menu === "peticiones" ? <hr /> : <></>}
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
      </ul>
      <div className="actions-section">
        <div className="actions-section">
          <Link className="link" to="/tareas">
            <button
              className="btn btn secondary-v"
              onClick={() => {
                setMenu("");
              }}
            >
              Tareas
            </button>
          </Link>
          <Link className="link" to="/donar">
            <button
              className="btn btn-yellow-white"
              onClick={() => {
                setMenu("");
              }}
            >
              Donar
            </button>
          </Link>
        </div>

        <div className="user">
          <Link to="/notificaciones">
            <Bell
              size={30}
              color="var(--textlight)"
              onClick={() => {
                setMenu("");
              }}
            />
          </Link>
          <Link
            className="link"
            to="/perfil"
            onClick={() => {
              setMenu("");
            }}
          >
            <img src={perfil} alt="" />
            Mi perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
