import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  Heart,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
const Footer = () => {
  return (
    <div className="footer">
      <div className="description-section">
        <div className="logo-section">
          <Heart size={48} color="#ffffff" weight="light" />
          <h3 className="title3">NourishNet</h3>
        </div>
        <p className="parr1">
          NourishNet es un proyecto que tiene como objetivo conectar la
          solidaridad con la necesidad{" "}
        </p>
      </div>
      <div className="footer-filler"></div>
      <div className="links-section">
        <h5 className="title5">Conoce más</h5>
        <ol className="links-wrapper">
          <li>
            <Link className="link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link className="link" to="/nosotros">
              Nosotros
            </Link>
          </li>
          <li>
            <Link className="link" to="/contacto">
              Contacto
            </Link>
          </li>
          <li>
            <Link className="link" to="/faq">
              Preguntas Frecuentes
            </Link>
          </li>
        </ol>
      </div>
      <div className="socials-section">
        <h5 className="title5">Nuestras redes</h5>
        <div className="socials-wrapper">
          <Link>
            <FacebookLogo size={48} color="#ffffff" weight="light" />
          </Link>
          <Link>
            <InstagramLogo size={48} color="#ffffff" weight="light" />
          </Link>
          <Link>
            <TiktokLogo size={48} color="#ffffff" weight="light" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
