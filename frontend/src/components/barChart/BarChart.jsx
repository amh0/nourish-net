// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const BarChart = ({ data }) => {
//   const chartRef = useRef(null); // Referencia al canvas del gráfico

//   console.log("-------------");
//   console.log(data);
//   console.log("----------------");
//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const ctx = chartRef.current.getContext("2d");

//     if (
//       chartRef.current !== null &&
//       typeof chartRef.current.chart !== "undefined"
//     ) {
//       chartRef.current.chart.destroy();
//     }

//     let chartData;

//     if (data[0].hasOwnProperty("nombre_cat")) {
//       // Si los datos tienen la propiedad "nombre_cat", asumimos un formato específico
//       chartData = {
//         labels: data.map((item) => item.nombre_cat),
//         datasets: [
//           {
//             label: "Cantidad",
//             data: data.map((item) => item.cantidad),
//             backgroundColor: "rgba(54, 162, 235, 0.6)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 1,
//           },
//         ],
//       };
//     } else if (data[0].hasOwnProperty("month")) {
//       // Si los datos tienen la propiedad "month", asumimos otro formato específico
//       chartData = {
//         labels: data.map((item) => item.month),
//         datasets: [
//           {
//             label: "Amount",
//             data: data.map((item) => item.amount),
//             backgroundColor: "rgba(54, 162, 235, 0.6)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 1,
//           },
//         ],
//       };
//     }

//     const chart = new Chart(ctx, {
//       type: "bar",
//       data: chartData,
//       options: {
//         scales: {
//           y: { beginAtZero: true },
//         },
//       },
//     });

//     // Guardar la referencia al gráfico creado
//     chartRef.current.chart = chart;
//   }, [data]);

//   return (
//     <div className="chart-container">
//       <canvas id="barChart" ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = chartRef.current.getContext("2d");

    if (
      chartRef.current !== null &&
      typeof chartRef.current.chart !== "undefined"
    ) {
      chartRef.current.chart.destroy();
    }

    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Cantidad",
          data: [],
          backgroundColor: "#a7d2cd",
          borderColor: "#a7d2cd",
          borderWidth: 1,
        },
      ],
    };

    if (data[0] && typeof data[0] === "object") {
      const keys = Object.keys(data[0]);
      chartData.labels = data.map((item) => item[keys[0]]);
      chartData.datasets[0].data = data.map((item) => item[keys[1]]);
    } else {
      chartData.labels = data.map((item, index) => index + 1);
      chartData.datasets[0].data = data.map(
        (item) => item.amount || item.cantidad
      );
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
            ticks: {
              callback: function (value, index, values) {
                return Number.isInteger(value) ? value : "";
              },
            },
          },
        },
      },
    });

    chartRef.current.chart = chart;
  }, [data]);

  return (
    <div className="chart-container">
      <canvas id="barChart" ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
