// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Use CORS to allow requests from your front end
app.use(cors());
app.use(express.json());

// Define routes to provide data
app.get('/featureImportance', (req, res) => {
  try {
    res.json({
      features: [
        { name: 'Exhaust Gas Temperature 1', importance: 0.118 },
        { name: 'Economizer Temperature 2', importance: 0.0969 },
        { name: 'Water Supply Amount (Instantaneous Flow)', importance: 0.0892 },
        { name: 'Fuel Amount (Instantaneous Flow)', importance: 0.0774 },
        // Additional features as needed...
      ],
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to load data.' });
  }
});

app.get('/efficiencyData', (req, res) => {
  res.json({
    efficiency: 95, // Replace this value with what you need
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://192.168.45.197:3001/`);
});
