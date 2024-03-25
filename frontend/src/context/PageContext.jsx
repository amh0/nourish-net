import React, { createContext, useEffect, useState } from "react";
// import food_data from "../components/assets/data";
import axios from "axios";
export const PageContext = createContext(null);
const PageContextProvider = (props) => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3001/api/products/findall");
      setFoodData(result.data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };

  const contextValue = { foodData };
  return (
    <PageContext.Provider value={contextValue}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
