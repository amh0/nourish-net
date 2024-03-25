import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import { ArrowLeft } from "@phosphor-icons/react";
import "../components/globals.css";
import "./css/Product.css";
const Product = () => {
  const { foodData } = useContext(PageContext);
  const { productId } = useParams();
  // handles foodData loading
  if (foodData === undefined || foodData.length === 0) {
    console.log("Fetching data... ");
    return <p>Error when fetching data</p>;
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
      {/* <ProductDisplay product={product} /> */}
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
