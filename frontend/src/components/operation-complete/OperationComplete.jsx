import React from "react";
import "../signup-form/step/Step.css";
import { Link } from "react-router-dom";

const OperationComplete = ({ title, description, link, buttonText }) => {
  return (
    <div className="step">
      <h2>{title}</h2>
      <p className="marginBottom">{description}</p>
      <div className="button-wrapper">
        <Link className="link" to={link}>
          <button className="btn secondary-v custom-button2">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OperationComplete;
