import React from "react";
import "./Body.css";
import Footer from "../footer/Footer";
import { Buildings, HandHeart, UserCircle } from "@phosphor-icons/react";
const Body = () => {
  return (
    <>
      <div className="stats-wrapper">
        <div className="stats-card">
          <Buildings size={96} color="#222222" weight="light" />
          <div className="stats-info">
            <h4 className="title4">30+ entidades</h4>
            <p className="parr1">
              Organizaciones que son parte de nuestra misión
            </p>
          </div>
        </div>
        <div className="stats-card">
          <HandHeart size={96} color="#222222" weight="light" />
          <div className="stats-info">
            <h4 className="title4">1000+ donaciones</h4>
            <p className="parr1">Realizadas a través de nuestra plataforma</p>
          </div>
        </div>
        <div className="stats-card">
          <UserCircle size={96} color="#2b2b2b" weight="light" />
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
            <div className="sqr-placeholder"></div>
            <button className="btn secondary-v">Donar ahora</button>
          </div>
          <div className="card-box">
            <div>
              <h4 className="title4">Voluntarios</h4>
              <p>
                Te necesitamos para transformar las vidas de otras personas.
              </p>
            </div>
            <div className="sqr-placeholder"></div>
            <button className="btn secondary-v">Quiero ser voluntario</button>
          </div>
        </div>
      </div>

      <div className="card-info-wrapper">
        <div className="sqr-placeholder"></div>
        <div className="text-section">
          <div>
            <h3 className="title3">Obtén donaciones</h3>
            <p className="parr1">
              Explora las donaciones disponibles, si no encuentras lo que
              necesitas publica una petición.
            </p>
          </div>
          <div className="btn-wrapper-card">
            <button className="btn bg0-secondary-v secondary-brd">
              Inicia sesión
            </button>
            <button className="btn secondary-v">Registro</button>
          </div>
        </div>
      </div>
      <div className="horizontal-wrapper">
        <h5 className="title5">
          Buscamos consolidar una red de{" "}
          <span className="accent">solidaridad</span>
        </h5>
        <p className="parr1">
          Estamos trabajando constantemente para mejorar nuestros servicios
        </p>
        <button className="btn bg-text-v">Contáctanos</button>
      </div>
      <div className="card-info-wrapper">
        <div className="text-section">
          <div>
            <h3 className="title3">Nuestra misión</h3>
            <p className="parr1">
              Somos una plataforma en línea dedicada a conectar donantes de
              alimentos con personas y entidades que enfrentan dificultades para
              acceder a alimentos.
            </p>
          </div>
          <div className="btn-wrapper-card">
            <button className="btn bg0-secondary-v secondary-brd">
              Leer más
            </button>
          </div>
        </div>
        <div className="sqr-placeholder"></div>
      </div>
      <div className="horizontal-wrapper secondary-wrapper">
        <h5 className="title5">Preguntas Frecuentes</h5>
        <p className="parr1">¿Tienes preguntas? Tenemos respuestas.</p>
        <button className="btn text-v text-brd">Explora respuestas</button>
      </div>

      <div className="horizontal-btn-section">
        <h3 className="title3">Únete a nuestra misión</h3>
        <div className="btn-group">
          <button className="btn bg0-secondary-v secondary-brd">
            Donar ahora
          </button>
          <button className="btn bg0-primary-v primary-brd">
            Ser voluntario
          </button>
          <button className="btn text-v text-brd ">Obtén donaciones</button>
        </div>
      </div>
    </>
  );
};

export default Body;
