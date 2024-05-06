import React, { useState } from "react";
import InformeSidebar from "../components/informeSidebar/InformeSidebar";
import "./css/Informes.css";
import InformePanel from "../components/InformePanel/InformePanel";

const Informes = () => {
  const [userType, setUserType] = useState("Usuarios");

  const updateUserType = (newUserType) => {
    setUserType(newUserType);
  };

  return (
    <div className="container-informe">
      <div className="sidebar-menu-informe">
        <InformeSidebar userType={updateUserType} />
      </div>
      <div className="content-right-informe">
        <InformePanel userType={userType} />
        {/* <SearchFiltersInforme userType={userType} /> */}
      </div>
    </div>
  );
};

export default Informes;
