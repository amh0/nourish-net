import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
const Product = () => {
  const { food_data } = useContext(PageContext);
  const { productId } = useParams();
  const product = food_data.find((e) => e.id === Number(productId));
  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
