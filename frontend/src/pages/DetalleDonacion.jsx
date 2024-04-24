import React from "react";
import { Link, useParams } from "react-router-dom";
import DonationDetailDisplay from "../components/donationDetailDisplay/DonationDetailDisplay";
import { ArrowLeft } from "@phosphor-icons/react";
const DetalleDonacion = (props) => {
  const { donacionId } = useParams();
  const { dePaginaTareas } = props;
  return (
    <div>
      <div className="go-back">
        <Link
          className="link"
          to={dePaginaTareas ? "/donaciones/entregas" : "/donaciones"}
        >
          <ArrowLeft size={24} weight="light" color="var(--textlight)" />
          <p className="parr1">
            Volver a {dePaginaTareas ? "Tareas" : "Donaciones"}
          </p>
        </Link>
      </div>
      <DonationDetailDisplay idDonacion={donacionId} />
    </div>
  );
};

export default DetalleDonacion;
