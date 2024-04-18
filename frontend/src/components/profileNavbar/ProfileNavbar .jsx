import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ShoppingCartSimple } from "phosphor-react";
import "./ProfileNavbar.css";
import logo from "../assets/logo_64.png";
import perfil from "../assets/perfil.jpg";
import { AuthContext } from "../../context/authContext";
const ProfileNavbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { notificationQty } = useContext(AuthContext);
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

        {currentUser && (currentUser.isDonor || currentUser.isAdmin) && (
          <li
            onClick={() => {
              setMenu("misDonaciones");
            }}
          >
            <Link className="link" to="/donaciones">
              {currentUser.isAdmin ? "Donaciones" : "Mis donaciones"}
            </Link>
            {menu === "misDonaciones" ? <hr /> : <></>}
          </li>
        )}

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
          {currentUser && currentUser.isVolunteer && (
            <Link className="link" to="/donaciones/entregas">
              <button
                className="btn btn secondary-v"
                onClick={() => {
                  setMenu("");
                }}
              >
                Tareas
              </button>
            </Link>
          )}
          {currentUser && currentUser.isDonor && (
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
          )}
        </div>

        <div className="user">
          {currentUser.isReceiver ? (
            <Link to="/solicitar">
              <div className="icon-badge-container">
                <ShoppingCartSimple
                  size={30}
                  color="var(--textlight)"
                  onClick={() => {
                    setMenu("");
                  }}
                />
                {currentUser.itemQty > 0 ? (
                  <div className="icon-badge">{currentUser.itemQty}</div>
                ) : null}
              </div>
            </Link>
          ) : null}
          <Link to="/notificaciones">
            <div className="icon-badge-container">
              <Bell
                size={30}
                color="var(--textlight)"
                onClick={() => {
                  setMenu("");
                }}
              />
              {notificationQty > 0 ? (
                <div className="icon-badge notif-badge">{notificationQty}</div>
              ) : null}
            </div>
          </Link>
          <Link
            className="link"
            to="/perfil"
            onClick={() => {
              setMenu("");
            }}
          >
            {currentUser && currentUser.img_perfil ? (
              <img src={currentUser.img_perfil} alt="" />
            ) : (
              <img src={perfil} alt="" />
            )}
            <span>{currentUser && currentUser.nombre} </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
