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
  const [tableItems, setTableItems] = useState([]);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [dataChart, setDataChar] = useState([]);

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
            <div className="analysis-container">
              <div className="table-container">
                <TableReport
                  tableData={tableData}
                  customClassName="custom-data-table"
                />
              </div>
            </div>
          </div>
        ) : (
          <p>No existen datos para mostrar.</p>
        )}
      </div>

      <h2>ANÁLISIS GRÁFICO</h2>

      <div className="analysis-container-grafics">
        {chartsData.length > 0 && chartData1.length > 0 && (
          <div className="analysis-container">
            <div className="analysis-barchart-content">
              <h3>{chartsData[0].title}</h3>
              <BarChart data={chartData1} />
            </div>
          </div>
        )}
        {chartsData.length > 1 && chartData2 && (
          <div className="analysis-container">
            <div className="analysis-barchart-content">
              <h3>{chartsData[1].title}</h3>
              {/*<div className="chart-period-options">
                 <button
                  onClick={() =>
                    handlePeriodToggle("mes", chartsData[1].databaseQuery[0])
                  }
                >
                  Mes
                </button>
                <button
                  onClick={() =>
                    handlePeriodToggle("anio", chartsData[1].databaseQuery[2])
                  }
                >
                  Año
                </button>
                <button
                  onClick={() =>
                    handlePeriodToggle("semana", chartsData[1].databaseQuery[3])
                  }
                >
                  Semana
                </button>
              </div> */}

              <BarChart data={chartData2} />
            </div>
          </div>
        )}
      </div>
      {/* {console.log(chartData)} */}
      {/* {chartsData.length > 0 ? (
        chartsData.map((chart, index) => {
          console.log(chart.activateButtons +" " +  index);
          //   if (
          //     chart.databaseQueries &&
          //     Array.isArray(chart.databaseQueries) &&
          //     chart.databaseQueries.length > 0
          //   ) {
          //     // console.log("aaaaaaaaaaaaa" + JSON.stringify(chart));
          //     // return <div></div>
          //     fetchDataAndSetDataChart(chart.databaseQueries[0]);
          //     console.log(index);
          //     return (
          //       <div></div>
          //       //   <div key={`chart-${index}`}>
          //       //     <h4>{chart.title}</h4>
          //       //     <BarChart data={dataChart} />
          //       //     {chart.activarBotones && (
          //       //       <div className="chart-period-options">
          //       //         <button
          //       //           onClick={() =>
          //       //             handlePeriodToggle("mes", chart.consulta[0])
          //       //           }
          //       //         >
          //       //           Mes
          //       //         </button>
          //       //         <button
          //       //           onClick={() =>
          //       //             handlePeriodToggle("anio", chart.consulta[1])
          //       //           }
          //       //         >
          //       //           Año
          //       //         </button>
          //       //         <button
          //       //           onClick={() =>
          //       //             handlePeriodToggle("semana", chart.consulta[2])
          //       //           }
          //       //         >
          //       //           Semana
          //       //         </button>
          //       //       </div>
          //       //     )}
          //       //   </div>
          //     );
          //   } else {
          //     console.error("Datos de gráfico inválidos:", chart); // Mostrar un error si los datos son inválidos
          //     return <p>No existen datos para mostrar.</p>; // Evitar renderizar este gráfico
          //   }
        })
      ) : (
        <p>No existen datos para mostrartttt.</p>
      )} */}
    </div>
  );
};

export default AnalysisSection;
