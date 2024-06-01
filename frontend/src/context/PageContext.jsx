import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const PageContext = createContext(null);
const PageContextProvider = (props) => {
  const apiURL = "https://nourish-net-api.onrender.com/api";
  const [foodData, setFoodData] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    fetchData();
    fetchCat();
    fetchVolunteers();
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
  const fetchVolunteers = async () => {
    try {
      const result = await axios.get(apiURL + "/user/get_volunteers");
      setVolunteers(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };

  const contextValue = {
    foodData,
    foodCat,
    volunteers,
  };
  return (
    <PageContext.Provider value={contextValue}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
