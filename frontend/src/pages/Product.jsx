import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import { ArrowLeft } from "@phosphor-icons/react";
import "../components/globals.css";
import "./css/Product.css";
const Product = () => {
  const { foodData } = useContext(PageContext);
  const { productId } = useParams();
  // obtener ruta desde la cual se llamo a este componente
  const location = useLocation().pathname.substring(1, 11);
  // verificar si se deben mostrar los controles de evaluacion
  const isEvaluation = location === "evaluacion";

  // verifica que los datos se hayan obtenido de la base
  if (foodData === undefined || foodData.length === 0) {
    console.log("Fetching data... ");
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }
  const product = foodData.find((e) => e.idalimento === Number(productId));
  return (
    <div>
      <div className="go-back">
        <Link className="link" to="/alimentos">
          <ArrowLeft size={24} weight="light" color="var(--textlight)" />
          <p className="parr1">Volver a Alimentos</p>
        </Link>
      </div>
      <ProductDisplay product={product} evaluation={isEvaluation} />
    </div>
  );
};

export default Product;
