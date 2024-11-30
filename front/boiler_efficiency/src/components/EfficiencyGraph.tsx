// File: src/components/EfficiencyGraph.tsx
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const EfficiencyGraph: React.FC = () => {
  const [efficiencyData, setEfficiencyData] = useState<{ x: number; y: number }[]>([]);
  const [currentEfficiency, setCurrentEfficiency] = useState<number | null>(null);

  useEffect(() => {
    // Fetching data from the optimization endpoint
    axios.get('http://127.0.0.1:5000/optimization')
      .then(response => {
        if (response.data && response.data.efficiency) {
          const efficiencyValue = response.data.efficiency;
          setEfficiencyData([{ x: 1, y: efficiencyValue }]);
          setCurrentEfficiency(efficiencyValue);
        } else {
          console.error('Efficiency data not found in the response');
        }
      })
      .catch(error => {
        console.error('Error fetching efficiency data:', error);
      });
  }, []);

  const chartData = {
    datasets: [
      {
        label: 'Efficiency (input/output method-steam)',
        data: efficiencyData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        min: 50,
        max: 110,
      },
    },
  };

  return (
    <div className="efficiency-graph">
      <h3>Efficiency Graph</h3>
      <Scatter data={chartData} options={options} />
      {currentEfficiency !== null && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Current efficiency: {currentEfficiency}%
        </div>
      )}
    </div>
  );
};

export default EfficiencyGraph;
