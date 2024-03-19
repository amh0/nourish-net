import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../context/PageContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import { ArrowLeft } from "@phosphor-icons/react";
import "../components/globals.css";
import "./css/Product.css";
const Product = () => {
  const { food_data } = useContext(PageContext);
  const { productId } = useParams();
  const product = food_data.find((e) => e.id === Number(productId));
  return (
    <div>
      <div className="go-back">
        <Link className="link" to="/alimentos">
          <ArrowLeft size={24} weight="light" color="var(--textlight)" />
          <p className="parr1">Volver a Alimentos</p>
        </Link>
      </div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
