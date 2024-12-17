import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, title }) => {
  // Palette de couleurs sobres et modernes
  const colors = ["#A6AEBF", "#C5D3E8", "#D0E8C5", "#FFF8DE"];
  const hoverColors = colors.map((color) => `${color}CC`); // Version transparente pour le hover

  // Préparer les données pour Chart.js
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} USD`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      {/* Titre centré et en gras */}
      <h4 style={{ fontWeight: "bold", marginBottom: "10px", color: "#495057", textAlign: "center" }}>
        {title}
      </h4>
      {/* Diagramme Donut */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
