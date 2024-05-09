import React, { useState, useEffect } from "react";
import BarChart from "../barChart/BarChart";
import axios from "axios";
import TableReport from "../tableReport/TableReport";
import "./AnalysisSection.css";

const AnalysisSection = ({ tablesData, chartsData, iduser }) => {
  const [chartType, setChartType] = useState("categoria");
  const [tableData, setTableData] = useState();
  const [chartData1, setChartData1] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  useEffect(() => {
    if (tablesData.length > 0) {
      fetchDataAndSetTableData(tablesData[1].databaseQuery);
    }
    if (chartsData.length > 0) {
      fetchDataAndSetDataChart(chartsData[0].databaseQuery, 1);
      if (chartsData.length > 1) {
        fetchDataAndSetDataChart(chartsData[1].databaseQuery, 2);
      }
    }
  }, [tablesData, chartsData]);

  const fetchData = async (consulta) => {
    try {
      const response = await axios.get(consulta, {
        params: {
          iduser: iduser || "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return null;
    }
  };

  const fetchDataAndSetDataChart = async (consulta, n) => {
    const data = await fetchData(consulta);
    if (n === 1 && data) {
      setChartData1(data);
    } else if (n === 2 && data) {
      setChartData2(data);
    }
    console.log(data);
  };

  const fetchDataAndSetTableData = async (consulta) => {
    const data = await fetchData(consulta);
    if (data) {
      setTableData(data);
    }
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handlePeriodToggle = (period, consulta) => {
    switch (period) {
      case "mes":
        fetchDataAndSetDataChart(consulta);
        break;
      case "anio":
        fetchDataAndSetDataChart(consulta);
        break;
      case "semana":
        fetchDataAndSetDataChart(consulta);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <h2>{tablesData[0]}</h2>
        {tableData &&
        tableData.length > 0 &&
        tablesData &&
        tablesData.length > 0 ? (
          <div>
            <div>
              <TableReport
                tableData={tableData}
                customClassName="custom-data-table"
              />
            </div>
          </div>
        ) : (
          <p>No existen datos para mostrar.</p>
        )}
      </div>

      <h2>ANÁLISIS GRÁFICO</h2>

      <div className="analysis-container-grafics">
        {chartsData.length > 0 && chartData1.length > 0 && (
          <div className="analysis-container-barchart">
            <div className="analysis-barchart-content">
              <h3>{chartsData[0].title}</h3>
              <BarChart data={chartData1} />
            </div>
          </div>
        )}
        {chartsData.length > 1 && chartData2 && (
          <div className="analysis-container-barchart">
            <div className="analysis-barchart-content">
              <h3>{chartsData[1].title}</h3>

              <BarChart data={chartData2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisSection;
