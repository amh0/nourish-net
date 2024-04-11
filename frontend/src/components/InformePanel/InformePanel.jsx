import { ChartPieSlice, Table } from "phosphor-react";
import React, { useEffect, useState } from "react";
import "./InformePanel.css";
import SearchFilters from "../SearchFilters/SearchFilters";
import TableReport from "../tableReport/TableReport";
import PieChartReport from "../pieChartReport/PieChartReport";
import {
  fetchUserData,
  fetchFoodData,
  fetchDonationsData,
} from "./dbQueries";

const InformePanel = ({ userType }) => {
  const [reportType, setReportType] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [searchFiltersData, setSearchFiltersData] = useState({});
  const [userData, setUserData] = useState([]);
  const reportOptions = [
    {
      type: "tabla",
      icon: <Table size={44} color="var(--background0)" weight="thin" />,
      label: "Tabla",
    },
    {
      type: "gráfica de pastel",
      icon: (
        <ChartPieSlice size={44} color="var(--background0)" weight="thin" />
      ),
      label: "Pastel",
    },
    // {
    //   type: "gráfica de barras",
    //   icon: <ChartBar size={44} color="var(--background0)" weight="thin" />,
    //   label: "Barras",
    // },
  ];

  const fetchDataUser = async () => {
    const data = await fetchUserData(searchFiltersData);
    setUserData(data);
  };

  const fetchDataFood = async () => {
    const data = await fetchFoodData(searchFiltersData);
    setUserData(data);
  };

  const fetchDataDonations = async () => {
    const data = await fetchDonationsData(searchFiltersData);
    setUserData(data);
  };

  useEffect(() => {
    setUserData([]);
    setSearchFiltersData({});
  }, [userType, reportType]);

  useEffect(() => {
    if (reportType === "tabla" && userType === "Usuarios") {
      fetchDataUser();
    } else if (reportType === "tabla" && userType === "Alimentos") {
      fetchDataFood();
    } else if (reportType === "tabla" && userType === "Donaciones") {
      fetchDataDonations();
    }
  }, [reportType, userType, searchFiltersData]);

  const renderReport = () => {
    switch (reportType) {
      case "tabla":
        return <TableReport tableData={userData} />;
      case "gráfica de pastel":
        return <PieChartReport userType={userType} />;
      default:
        return null;
    }
  };

  const handleSearchFiltersData = (data) => {
    setSearchFiltersData(data);
    // alert(JSON.stringify(data));
  };

  const handleGenerateReport = (type, buttonId) => {
    setReportType(type);
    setActiveButton(buttonId);
  };
  return (
    <div>
      <div>
        <div className="option-report-informe">
          <h2>{userType.toUpperCase()}</h2>
          <p>Selecciona una opción para generar el informe:</p>
          <div className="buttons-container">
            {reportOptions.map((option, index) => (
              <button
                key={index}
                style={{
                  backgroundColor:
                    activeButton === index
                      ? "var(--secondarylight)"
                      : "var(--secondary)",
                }}
                onClick={() => {
                  handleGenerateReport(option.type, index);
                }}
              >
                {option.icon} {option.label}
              </button>
            ))}
          </div>
          {/* {reportType === "tabla" && (
            <div className="container-btnPDF">
              <button> Generar pdf </button>
            </div>
          )} */}
        </div>
        {reportType === "tabla" && (
          <SearchFilters
            userType={userType}
            onSearchFiltersData={handleSearchFiltersData}
          />
        )}

        {renderReport()}
      </div>
    </div>
  );
};

export default InformePanel;
