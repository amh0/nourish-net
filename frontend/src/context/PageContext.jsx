import React, { createContext } from "react";
import food_data from "../components/assets/data";
export const PageContext = createContext(null);
const PageContextProvider = (props) => {
  const contextValue = { food_data };
  return (
    <PageContext.Provider value={contextValue}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
