import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ expenses }) => {
  // Regrouper les dépenses par catégorie
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + parseFloat(amount);
    return acc;
  }, {});

  // Préparer les données pour Chart.js
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ],
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ],
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
    <div style={{ width: "50%", margin: "auto" }}>
      <h3>Répartition des Dépenses</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
