
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
import featureGraphsTemplate from '../data/featureGraphsTemplate.json';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FeatureGraph {
  name: string;
  data: number[];
}

const FeatureGraphs: React.FC = () => {
  console.log("FeatureGraphs is rendering");

  const [features, setFeatures] = useState<FeatureGraph[]>([]);

  useEffect(() => {
    // Using data from JSON file
    setFeatures(featureGraphsTemplate.features);
  }, []);

  return (
    <div className="feature-graphs">
      <h3>Preprocessing Results</h3>
      <div className="graphs-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {features.map((feature, index) => (
          <div key={index} className="feature-graph">
            <h4>{feature.name}</h4>
            <Chart
              type='bar'
              data={{
                labels: feature.data,
                datasets: [
                  {
                    label: feature.name,
                    data: feature.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: feature.name,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Frequency',
                    },
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGraphs;
