import React from "react";
import "./Body.css";
const Body = () => {
  return (
    <>
      <div className="stats-wrapper">
        <div className="stats-card">
          <div className="stats-placeholder"></div>
          <div className="stats-info">
            <h4 className="title4">30+ entidades</h4>
            <p className="parr1">
              Organizaciones que son parte de nuestra misión
            </p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-placeholder"></div>
          <div className="stats-info">
            <h4 className="title4">1000+ entidades</h4>
            <p className="parr1">Realizadas a través de nuestra plataforma</p>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-placeholder"></div>
          <div className="stats-info">
            <h4 className="title4">50+ voluntarios</h4>
            <p className="parr1">Colaborando en la red de solidaridad</p>
          </div>
        </div>
      </div>
      <div className="card-wrapper">
        <h3 className="title3">
          ¿Estas listo para hacer la
          <span className="accent-secondary"> diferencia</span>?
        </h3>
        <div className="card-section">
          <div className="card-box">
            <div>
              <h4 className="title4">Empieza a donar</h4>
              <p>
                Conviértete en un donante y comparte el sabor de la bondad.{" "}
              </p>
            </div>
            <div className="card-placeholder"></div>
            <button className="btn secondary-v">Donar ahora</button>
          </div>
          <div className="card-box">
            <div>
              <h4 className="title4">Voluntarios</h4>
              <p>
                Te necesitamos para transformar las vidas de otras personas.
              </p>
            </div>
            <div className="card-placeholder"></div>
            <button className="btn secondary-v">Quiero ser voluntario</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
