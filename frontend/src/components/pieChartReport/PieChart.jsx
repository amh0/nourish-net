// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const PieChart = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");

//       chartInstance.current = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: data.map((item) => item.categoria),
//           datasets: [
//             {
//               label: "Cantidad de Alimentos por Categoría",
//               data: data.map((item) => item.cantidad_alimentos),
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.6)",
//                 "rgba(54, 162, 235, 0.6)",
//                 "rgba(255, 206, 86, 0.6)",
//                 "rgba(75, 192, 192, 0.6)",
//                 "rgba(153, 102, 255, 0.6)",
//               ],
//             },
//           ],
//         },
//         options: {
//           plugins: {
//             legend: {
//               display: true,
//               position: "bottom",
//             },
//           },
//         },
//       });
//     }
//   }, [data]);

//   return (
//     <div
//       className="chart-container"
//       style={{ display: "flex", "justify-content": "center" }}
//     >
//       <div
//         className="chart-container"
//         style={{
//           width: 400,
//           height: 400,
//         }}
//       >
//         <canvas ref={chartRef} className="chart-canvas"></canvas>
//       </div>
//     </div>
//   );
// };

// export default PieChart;

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const labels = data.map((obj) => Object.keys(obj)[0]);
      const values = data.map((obj) => obj[Object.keys(obj)[0]]);

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "",
              data: values,
              backgroundColor: [
                "#ffd56f",
                "#fff7e2",
                "#6db4ac",
                "#a7d2cd",
                "#e2f0ee",
                "#fa9477",
                "#feb491",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div
      className="chart-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="chart-container"
        style={{
          width: 400,
          height: 400,
        }}
      >
        <canvas ref={chartRef} className="chart-canvas"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
