import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./BarChart.css";

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
