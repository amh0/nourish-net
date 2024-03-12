import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2 class="title2">
          La <span className="accent">bondad</span> tiene un sabor compartela
        </h2>
        <p className="parr1">
          Conectamos a donadores con organizaciones y personas que necesitan
          ayuda. Somos el punto de conexión donde la generosidad se une con la
          necesidad, creando una red de solidaridad alimentaria.
        </p>
        <div className="btn-wrapper">
          <button className="btn bg0-secondary-v secondary-brd">
            Obten donaciones
          </button>
          <button className="btn secondary-v">Dona ahora</button>
        </div>
      </div>
      <div className="hero-right">
        <div className="placeholder"></div>
      </div>
    </div>
  );
};

export default Hero;
