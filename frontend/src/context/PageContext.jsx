import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const PageContext = createContext(null);
const PageContextProvider = (props) => {
  const apiURL = "http://localhost:3001/api";
  const [foodData, setFoodData] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  useEffect(() => {
    fetchData();
    fetchCat();
  }, []);
  const fetchCat = async () => {
    try {
      const result = await axios.get(apiURL + "/products/findcategories");
      setFoodCat(result.data);
      // console.log("Categorias obtenidas");
    } catch (err) {
      console.log("Error obteniendo categorias");
      console.log(err);
    }
  };
  const fetchData = async () => {
    try {
      const result = await axios.get(apiURL + "/products/findall");
      setFoodData(result.data);
    } catch (err) {
      console.log("Error obteniendo productos");
      console.log(err);
    }
  };

  const contextValue = { foodData, foodCat };
  return (
    <PageContext.Provider value={contextValue}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
