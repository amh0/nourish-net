import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

import "./css/CoordSolicitud.css";
import Coordination from "../components/coordination/Coordination";

const CoordSolicitud = (props) => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [cantidad, setCantidad] = useState(1);
  useEffect(() => {
    setProduct(location.state.alimento);
    setCantidad(location.state.cantidad_solicitada);
  }, [location.state]);
  console.log(product);
  return (
    <div>
      <div className="go-back">
        <Link className="link" to={`/producto/${product.idalimento}`}>
          <ArrowLeft size={24} weight="light" color="var(--textlight)" />
          <p className="parr1">Volver al Alimento</p>
        </Link>
      </div>
      <Coordination product={product} cantidad={cantidad} />
    </div>
  );
};

export default CoordSolicitud;
