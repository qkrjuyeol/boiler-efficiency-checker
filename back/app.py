from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from werkzeug.serving import WSGIRequestHandler
from dotenv import load_dotenv
import os
import joblib
import io
import scipy
import sklearn


load_dotenv()

app = Flask(__name__)

app.config['MYSQL_HOST'] = '192.168.45.197'
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_PORT'] = int(os.getenv('MYSQL_PORT'))

mysql = MySQL(app)

#random_forest.pkl
@app.route('/rf', methods=['GET'])
def get_feature_importance():
    cursor = mysql.connection.cursor()
    try:
        
        query = "SELECT data FROM ai WHERE name = %s"
        cursor.execute(query, ("random_forest.pkl",))  
        result = cursor.fetchone()

        if result is None:
            return jsonify({'error': 'Model not found in database'}), 404

        model_data = result[0]
        if isinstance(model_data, str): 
            model_data = model_data.encode()  
        
        model_stream = io.BytesIO(model_data)
        model = joblib.load(model_stream)

        if hasattr(model, "feature_importances_"):
            feature_importances = model.feature_importances_

            feature_names = [
                "Exhaust Gas Temperature 1",
                "Economizer Temperature 2",
                "Water Supply Amount (Instantaneous Flow)",
                "Fuel Amount (Instantaneous Flow)",
                "Exhaust Gas Temperature 3",
                "Fuel Amount (Cumulative Flow)",
                "Water Supply Amount (Cumulative Flow)",
                "Exhaust Gas Temperature 2",
                "Economizer Temperature 1",
                "Exhaust Gas O2",
                "Air Damper Input",
                "Boiler Temperature",
                "Exhaust Gas NOx",
                "Gas Damper Input",
                "Blower Input",
                "Boiler Pressure",
                "load factor",
                "Water Supply Pump",
                "Water Supply Level",
                "Air Damper",
                "Gas Damper",
                "Blower Inverter Output",
                "Recirculation Damper Input",
                "Recirculation External Damper",
                "Recirculation Damper",
                "Water Supply Pump Input",
                "Set Pressure",
                "Recirculation External Damper Input",
                "Recirculation NOx",
                "Recirculation O2"
            ]
            
            features = [
                {"name": name, "importance": importance}
                for name, importance in zip(feature_names, feature_importances)
            ]
            sorted_features = sorted(features, key=lambda x: x["importance"], reverse=True)
        else:
            return jsonify({'error': 'Model does not have feature_importances_ attribute'}), 400

        response = {
            "features": sorted_features
        }

        return jsonify({'message': 'Model loaded successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()


if __name__ == '__main__':
    app.run(debug=True)