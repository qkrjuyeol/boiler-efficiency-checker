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
  
- **server.py**: Implements a simple backend API. To serve efficiency value, preproccesed data image and feature importance data.

## Setup Instructions

### Prerequisites
- npm/yarn installed
- Git installed
- VSCode
- Set up backend API for use


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

   The development server will start on the localhost address shown in the terminal. Open this URL in a browser to view the app.
4. **Example**
   Main page with the menu bar:
   Task App

    - 전처리 결과 -> Preprocessed data
    - RF 결과 -> Feature importance from Random Forest model with values
    - 최적화 결과 -> Efficiency value
<img width="1354" alt="Screenshot 2024-11-30 at 5 04 35 PM" src="https://github.com/user-attachments/assets/13680fea-a452-4210-b7c6-08f2f36abedd">
<img width="1087" alt="Screenshot 2024-11-30 at 5 05 36 PM" src="https://github.com/user-attachments/assets/2b373885-5d99-494d-b569-96d835ea4932">
<img width="1081" alt="Screenshot 2024-11-30 at 5 06 42 PM" src="https://github.com/user-attachments/assets/bbd9667c-79f3-48c3-8683-0506041e7b82">

**Will be developed soon to show more accurate graphs**

## Troubleshooting

- **CORS Errors**: Ensure the server has CORS enabled to allow requests from `localhost`.
- **Module Not Found**: Ensure all dependencies are installed by running `npm install` in both the root and `front` directories.
- **Server Not Found**: Make sure the server is running on the right API address.



