import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const PageContext = createContext(null);
const PageContextProvider = (props) => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/products/findall"
      );
      setFoodData(result.data);
      // console.log("Products fetched");
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
