# Boiler Efficiency Checker

## Overview
This project is a web application designed to visualize various aspects of boiler efficiency. It includes charts and graphs for performance metrics such as feature importance and efficiency values. The project retrieves data from a backend API and displays it in an interactive web interface to help users easily analyze and understand boiler efficiency.

The frontend is implemented using React with Chart.js. Frontend consumes data provided by the backend API and presents it in a user-friendly interface.

## Project Structure
The repository is divided into the following main directories:

- **front/**: Contains all the frontend code, including the user interface and React components.
  - `src/components/`: The core React components used in the project.
    - `EfficiencyGraph.tsx`: A scatter plot to visualize the current efficiency of the boiler.
    - `FeatureImportanceGraph.tsx`: A bar chart to show the importance of different features for boiler performance.
    - `FeatureGraphs.tsx`: Includes graphs on preprocessed boiler metrics.
  - `src/data/`: Holds template JSON files used during development, which were replaced by API calls to fetch live data.
  
- **server.js**: Implements a simple backend API using Express.js to serve efficiency and feature importance data.

## Setup Instructions

### Prerequisites
- Node.js and npm/yarn installed
- Git installed


1. **Navigate to the Frontend Directory**

   ```bash
   cd front
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend Development Server**
   To start the React development server:

   ```bash
   npm start
   ```

   The development server will start on `http://localhost:5175/`. Open this URL in a browser to view the app.
4. **Example**
   1 Main page with the menu bar:
         Task App
          전처리 결과 -> shows preprocessed data
          RF 결과 -> Feature importance Random Forest model with values
          최적화 결과 -> Efficiency result

<img width="1440" alt="Screenshot 2024-11-30 at 2 32 13 PM" src="https://github.com/user-attachments/assets/23e17f3f-fc67-4c62-b6b8-35b9d74eca36">
<img width="1440" alt="Screenshot 2024-11-30 at 2 31 40 PM" src="https://github.com/user-attachments/assets/9325ff4a-be18-46e7-9108-e25c756738cc">
<img width="1440" alt="Screenshot 2024-11-30 at 2 31 56 PM" src="https://github.com/user-attachments/assets/6c42029d-b966-431b-bbc3-10c86b8dfa15">

**Will be developed soon to show more accurate graphs**

## Troubleshooting

- **CORS Errors**: Ensure the server has CORS enabled to allow requests from `localhost`.
- **Module Not Found**: Ensure all dependencies are installed by running `npm install` in both the root and `front` directories.
- **Server Not Found**: Make sure the server is running on `192.168.45.197:3001` and can be accessed from your front-end application.


## Contributors
- **Jennie (Zhanylmyrza Askarova)**
