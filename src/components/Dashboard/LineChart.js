import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function LineChart() {
  const [incomes, setIncomes] = useState(() => {
    const savedIncomes = localStorage.getItem('incomes');
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    // Recalculate savings every time incomes or expenses change
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [incomes, expenses]);

  // Calcul des épargnes mensuelles
  const calculateSavings = () => {
    const groupByMonth = (items) => {
      return items.reduce((acc, item) => {
        const date = new Date(item.date);
        // Utiliser uniquement le mois et l'année pour le groupement
        const monthYear = new Date(date.getFullYear(), date.getMonth(), 1);
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear] += parseFloat(item.amount);
        return acc;
      }, {});
    };

    const groupedIncomes = groupByMonth(incomes);
    const groupedExpenses = groupByMonth(expenses);

    // Définir tous les mois de l'année (Janvier à Décembre)
    const allMonths = Array.from({ length: 12 }, (_, index) => {
      const date = new Date();
      date.setMonth(index);
      return new Date(date.getFullYear(), index, 1); // Premier jour de chaque mois
    });

    const savingsData = allMonths.map((month) => {
      const income = groupedIncomes[month] || 0;
      const expense = groupedExpenses[month] || 0;
      return income - expense;
    });

    // Formatage des mois pour l'axe X
    const formattedMonths = allMonths.map(month => {
      return month.toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    return { savingsData, formattedMonths };
  };

  const { savingsData, formattedMonths } = calculateSavings();

  const chartData = {
    labels: formattedMonths, // Les labels sont les mois formatés
    datasets: [
      {
        label: 'Epargnes (Revenus - Dépenses)',
        data: savingsData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Epargnes (€)',
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default LineChart;
