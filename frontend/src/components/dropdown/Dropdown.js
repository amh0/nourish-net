import React, { useState, useContext } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
function Dropdown(props) {
  const { currentUser } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const type = props.type;
  console.log(type);
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
        {type === "default" ? (
          <>
            <li>
              <Link
                className="dropdown-link link"
                to="/nosotros"
                onClick={() => setClick(false)}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-link link"
                to="/contacto"
                onClick={() => setClick(false)}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-link link"
                to="/faq"
                onClick={() => setClick(false)}
              >
                Preguntas
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}

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
            Alimentos
          </Link>
        </li>

        {currentUser && currentUser.isVolunteer && (
          <li>
            <Link
              className="dropdown-link link"
              to="/tareas"
              onClick={() => setClick(false)}
            >
              Tareas
            </Link>
          </li>
        )}

        {currentUser && currentUser.isDonor && (
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
        {currentUser && currentUser.isAdmin && (
          <li>
            <Link
              className="dropdown-link link"
              to="/informes"
              onClick={() => setClick(false)}
            >
              Informes
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
