import React, { useState } from "react";
import "./Step.css";
import { Link } from "react-router-dom";

const SignupComplet = () => {
  return (
    <div className="step">
      <h2>Registro completado</h2>
      <p className="marginBottom">Ahora eres parte de nuestra red solidaria</p>
      <div className="button-wrapper">
        <Link className="link" to="/alimentos">
          <button
            className="btn secondary-v custom-button2"
          >
            Comienza ahora
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignupComplet;
