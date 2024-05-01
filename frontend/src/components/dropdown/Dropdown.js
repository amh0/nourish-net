import React, { useState, useContext } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
function Dropdown() {
  const { currentUser } = useContext(AuthContext);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <Link
            className="dropdown-link link"
            to="/"
            onClick={() => setClick(false)}
          >
            Inicio
          </Link>
        </li>

        {currentUser && (currentUser.isDonor || currentUser.isAdmin) && (
          <li>
            <Link
              className="dropdown-link link"
              to="/donaciones"
              onClick={() => setClick(false)}
            >
              {currentUser.isAdmin ? "Donaciones" : "Mis donaciones"}
            </Link>
          </li>
        )}

        <li>
          <Link
            className="dropdown-link link"
            to="/peticiones"
            onClick={() => setClick(false)}
          >
            Peticiones
          </Link>
        </li>

        <li>
          <Link
            className="dropdown-link link"
            to="/alimentos"
            onClick={() => setClick(false)}
          >
            Mis donaciones
          </Link>
        </li>

        {currentUser && currentUser.isVolunteer && (
          <li>
            <Link
              className="dropdown-link link"
              to="/donaciones/entregas"
              onClick={() => setClick(false)}
            >
              Tareas
            </Link>
          </li>
        )}

        {currentUser && currentUser.isVolunteer && (
          <li>
            <Link
              className="dropdown-link link"
              to="/donar"
              onClick={() => setClick(false)}
            >
              Donar
            </Link>
          </li>
        )}
        {/* {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })} */}
      </ul>
    </>
  );
}

export default Dropdown;
