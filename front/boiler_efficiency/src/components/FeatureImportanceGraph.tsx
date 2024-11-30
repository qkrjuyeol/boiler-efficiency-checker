// File: src/components/FeatureImportanceGraph.tsx
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import featureImportance from '../data/featureImportance.json';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Feature {
  name: string;
  importance: number;
}

const FeatureImportanceGraph: React.FC = () => {
  console.log("FeatureImportanceGraph is rendering");

  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    // Using data from JSON file
    setFeatures(featureImportance.features);
  }, []);

  const chartData = {
    labels: features.map((feature) => feature.name),
    datasets: [
      {
        label: 'Importance Score',
        data: features.map((feature) => feature.importance),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // Corrected: Specify the position explicitly as 'top', 'bottom', 'left', or 'right'
      },
      title: {
        display: true,
        text: 'Feature Importance from Random Forest Model (with values)',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Feature',
          font: {
            size: 14,
          },
        },
        ticks: {
          maxRotation: 45, // Rotate labels by 45 degrees for better readability
          minRotation: 45,
          autoSkip: false,
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Importance Score',
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="feature-importance-graph" style={{ height: '500px', width: '800px', margin: 'auto' }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default FeatureImportanceGraph;
