import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="description-section">
        <div className="logo-section">
          <div></div>
          <h3 className="title3">NourishNet</h3>
        </div>
        <p className="parr1">
          NourishNet es un proyecto que tiene como objetivo conectar la
          solidaridad con la necesidad{" "}
        </p>
      </div>
      <div className="links-section">
        <h5 className="title5">Conoce más</h5>
        <div className="links-wrapper">
          <ol>
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Contacto</li>
            <li>Preguntas Frecuentes</li>
          </ol>
        </div>
      </div>
      <div className="socials-section">
        <h5 className="title5">Nuestras redes</h5>
        <div className="socials-wrapper">
          <ol>
            <div className="icon-placeholder"></div>
            <div className="icon-placeholder"></div>
            <div className="icon-placeholder"></div>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Footer;
