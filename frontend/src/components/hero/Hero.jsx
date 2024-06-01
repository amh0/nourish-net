import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2 className="title2">
          La <span className="accent">bondad</span> tiene un sabor compartela
        </h2>
        <p className="parr1">
          Conectamos a donadores con organizaciones y personas que necesitan
          ayuda.
          <span className="long-desc">
            Somos el punto de conexión donde la generosidad se une con la
            necesidad, creando una red de solidaridad alimentaria.
          </span>
        </p>
        <div className="btn-wrapper">
          <Link className="link" to="/signup">
            <button className="btn bg0-secondary-v secondary-brd">
              Obten donaciones
            </button>
          </Link>
          <Link className="link" to="/signup">
            <button className="btn secondary-v">Dona ahora</button>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="placeholder"></div>
      </div>
    </div>
  );
};

export default Hero;
