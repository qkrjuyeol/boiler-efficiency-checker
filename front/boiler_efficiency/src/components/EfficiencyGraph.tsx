// File: src/components/EfficiencyGraph.tsx
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const EfficiencyGraph: React.FC = () => {
  const [efficiencyData, setEfficiencyData] = useState<{ x: number; y: number }[]>([]);
  const [currentEfficiency, setCurrentEfficiency] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.45.197:3001/efficiencyData');
        const data = await response.json();
        if (data && data.efficiency) {
          setEfficiencyData([{ x: 1, y: data.efficiency }]);
          setCurrentEfficiency(data.efficiency);
        }
      } catch (error) {
        console.error('Error fetching efficiency data:', error);
      }
    };

    fetchData();
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
