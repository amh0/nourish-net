import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import axios from "axios";
import "./PieChartReport.css";

const PieChartReport = ({ userType }) => {
  const [tit, setTit] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setChartData([]);
      setTit([]);
      const fetchData = async (x, tit) => {
        try {
          const response = await axios.get(
            `https://nourish-net-api.onrender.com/api/reports/${x}`
          );
          const formattedData = convertObjectToArray(response.data);

          setChartData((prevChartData) => [...prevChartData, formattedData]);
          setTit((prevChartData) => [...prevChartData, tit]);

          console.log(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setChartData([]);
        }
      };

      if (userType === "Usuarios") {
        fetchData("get-nroUser", "Cantidad Roles");
        fetchData("get-typeUser", "Tipo Usuarios");
      } else if (userType === "Donaciones") {
        fetchData("get-esatdoEntrega", "Estado Entrega");
        fetchData("get-tipoEnvio", "Tipo de envio");
      } else if (userType === "Alimentos") {
        fetchData("get-nroDisponibleAgotado", "Estado de alimentos");
        fetchData("get-nroFechaVen", "Fecha vencimiento");
        fetchData("get-category-type", "Categoria");
        fetchData("get-alimentosRec", "Alimentos donados");
      }
    }
  }, [userType, isMounted]);

  const convertObjectToArray = (obj) => {
    return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  };

  return (
    <div className="pie-chart-report">
      {chartData.map((chart, index) => (
        <div key={index} className="pie-chart-container">
          <h2>{tit[index]}</h2>
          <div>
            <PieChart data={chart} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default PieChartReport;
