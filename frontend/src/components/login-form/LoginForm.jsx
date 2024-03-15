import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensageError, setMensageError] = useState("");

  return (
    <div className="signup-container">
      <div className="rectangle-container"></div>
      <div className="step">
        <div className="step-one">
          <h2 className="title3">Inicia Sesión</h2>
          <p className="parr2">Ingresa tus credenciales</p>
          <div className="input-wrapper">
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <p className="text-option">¿Olvidaste tu contraseña?</p>

          <div className="button-wrapper">
            <button className="btn secondary-v">Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
