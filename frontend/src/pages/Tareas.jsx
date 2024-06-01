import React from "react";
import { Link } from "react-router-dom";
import "./css/Tareas.css";
import { Toolbox, Package } from "@phosphor-icons/react";
const Tareas = () => {
  return (
    <div className="tareas">
      <div className="card-section">
        <Link className="link" to={`/donaciones/entregas`}>
          <div className="card-box">
            <h4 className="title5">Entregas</h4>
            <div className="icon-wrapper">
              <Package size={64} color="var(--secondary)" />
            </div>
            <p className="parr2">Explora entregas pendientes y realizadas</p>
          </div>
        </Link>
        <Link className="link" to={`/evaluacion`}>
          <div className="card-box">
            <h4 className="title5">Evaluación</h4>
            <div className="icon-wrapper">
              <Toolbox size={64} color="var(--secondary)" />
            </div>
            <p className="parr2">
              Realiza el control de calidad de los productos
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Tareas;
