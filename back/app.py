from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from werkzeug.serving import WSGIRequestHandler
import base64
from flask_cors import CORS
import joblib
import io
import sklearn
from scipy.optimize import differential_evolution 
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'epboil'

mysql = MySQL(app)


def init():
    with app.app_context():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT data FROM rf")
        data = cursor.fetchall()
        cursor.close()
        binary_data = b''
        for i in range(len(data)):
            binary_data += data[i][0]
        buffer = io.BytesIO(binary_data)
        global rf, r_rf
        rf = joblib.load(buffer)

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT data FROM r_rf")
        data = cursor.fetchall()
        cursor.close()
        binary_data = b''
        for i in range(len(data)):
            binary_data += data[i][0]
        buffer = io.BytesIO(binary_data)
        r_rf = joblib.load(buffer)

@app.route('/ModeltoDB', methods=['GET'])
def api_model_DB():
    WSGIRequestHandler.timeout = 100000
    cursor = mysql.connection.cursor()
    query = "INSERT INTO rf (chunk_index, data) VALUES (%s, %s)"
    file_name = ['random_forest.pkl', 'reduced_random_forest.pkl', 'scaler.pkl']
    
    for i in range(0,1):
        with open(file_name[i], 'rb') as file:
            chunk_index = 0
            while True:
                chunk = file.read(500 * 1024 * 1024)  # 500MB씩 읽기
                if not chunk:
                    break
                cursor.execute(query, (chunk_index, chunk))
                chunk_index += 1
    
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Model has been saved to the database'})

@app.route('/preprocessing', methods=['GET'])
def img_preprocessing():
    with open('preprocessing_img.jpg', 'rb') as img_file:
        img_data = img_file.read()
        img_base64 = base64.b64encode(img_data).decode('utf-8')
    return jsonify({'name': 'data.jpg', 'data': img_base64})

@app.route('/rf', methods=['GET'])
def rf_feature():
    feature = [(name, value) for name, value in zip(['load factor', 'Set Pressure', 'Boiler Pressure',
       'Blower Inverter Output', 'Blower Input', 'Water Supply Pump',
       'Water Supply Pump Input', 'Gas Damper', 'Gas Damper Input',
       'Air Damper', 'Air Damper Input', 'Recirculation Damper',
       'Recirculation External Damper', 'Recirculation Damper Input',
       'Recirculation External Damper Input', 'Water Supply Level',
       'Boiler Temperature', 'Exhaust Gas Temperature 1',
       'Exhaust Gas Temperature 2', 'Exhaust Gas Temperature 3',
       'Economizer Temperature 1', 'Economizer Temperature 2',
       'Exhaust Gas NOx', 'Exhaust Gas O2', 'Recirculation O2',
       'Recirculation NOx', 'Water Supply Amount (Cumulative Flow)',
       'Water Supply Amount (Instantaneous Flow)',
       'Fuel Amount (Cumulative Flow)', 'Fuel Amount (Instantaneous Flow)'], rf.feature_importances_)]
    
    feature.sort(key=lambda x: x[1], reverse=True)
    return jsonify({'feature': feature})

@app.route('/optimization', methods=['GET'])
def optimization():
    # def objective_function(x):
    #     pred = r_rf.predict(np.array(x).reshape(1,-1))
    #     return -pred[0]  # maximize efficiency by minimizing the negative

    # # 파라미터 범위 정의 (예: 각 파라미터 값의 범위)
    # bounds = [(-27.130434782608894, 2.6956521739130586),
    #             (-0.3852691218130312, 1.03328611898017),
    #             (-0.0101112234580384, 1.6663296258847322),
    #             (-1.663551401869159, 6.626168224299066),
    #             (-0.4648829431438128, 2.6321070234113715),
    #             (-0.5434083601286174, 1.8745980707395495),
    #             (-0.6506024096385542, 1.996987951807229),
    #             (-1.863631318400777, 0.7703953648411659),
    #             (-13.249999999999988, 2.749999999999999),
    #             (-1.8773039889958731, 0.7531980742778542),
    #             (-0.0172910662824207, 2.466858789625361),
    #             (-1.2, 0.0727272727272726),
    #             (-0.0043041606886657, 1.4088952654232425),
    #             (-0.0333333333333333, 2.4766666666666666),
    #             (0.0, 22.291666666666668),
    #             (0.0, 6.294117647058824)]

    # result = differential_evolution(objective_function, bounds)

    
    # op = -result.fun

    # cursor = mysql.connection.cursor()
    # cursor.execute("SELECT data FROM ai WHERE name = 'scaler.pkl'")
    # data = cursor.fetchone()
    # cursor.close()
    # binary_data = data[0]
    # buffer = io.BytesIO(binary_data)
    # scaler = joblib.load(buffer)

    # optimized_data = pd.DataFrame(columns=['load factor', 'Set Pressure', 'Boiler Pressure',
    #    'Blower Inverter Output', 'Blower Input', 'Water Supply Pump',
    #    'Water Supply Pump Input', 'Gas Damper', 'Gas Damper Input',
    #    'Air Damper', 'Air Damper Input', 'Recirculation Damper',
    #    'Recirculation External Damper', 'Recirculation Damper Input',
    #    'Recirculation External Damper Input', 'Water Supply Level',
    #    'Boiler Temperature', 'Exhaust Gas Temperature 1',
    #    'Exhaust Gas Temperature 2', 'Exhaust Gas Temperature 3',
    #    'Economizer Temperature 1', 'Economizer Temperature 2',
    #    'Exhaust Gas NOx', 'Exhaust Gas O2', 'Recirculation O2',
    #    'Recirculation NOx', 'Water Supply Amount (Cumulative Flow)',
    #    'Water Supply Amount (Instantaneous Flow)',
    #    'Fuel Amount (Cumulative Flow)', 'Fuel Amount (Instantaneous Flow)',
    #    'Efficiency (input/output method-steam)'])
    # optimized_data.loc[0] = [0 for _ in range(len(['load factor', 'Set Pressure', 'Boiler Pressure',
    #    'Blower Inverter Output', 'Blower Input', 'Water Supply Pump',
    #    'Water Supply Pump Input', 'Gas Damper', 'Gas Damper Input',
    #    'Air Damper', 'Air Damper Input', 'Recirculation Damper',
    #    'Recirculation External Damper', 'Recirculation Damper Input',
    #    'Recirculation External Damper Input', 'Water Supply Level',
    #    'Boiler Temperature', 'Exhaust Gas Temperature 1',
    #    'Exhaust Gas Temperature 2', 'Exhaust Gas Temperature 3',
    #    'Economizer Temperature 1', 'Economizer Temperature 2',
    #    'Exhaust Gas NOx', 'Exhaust Gas O2', 'Recirculation O2',
    #    'Recirculation NOx', 'Water Supply Amount (Cumulative Flow)',
    #    'Water Supply Amount (Instantaneous Flow)',
    #    'Fuel Amount (Cumulative Flow)', 'Fuel Amount (Instantaneous Flow)',
    #    'Efficiency (input/output method-steam)']))]

    # feature = [(name, value) for name, value in zip(['load factor', 'Set Pressure', 'Boiler Pressure',
    #    'Blower Inverter Output', 'Blower Input', 'Water Supply Pump',
    #    'Water Supply Pump Input', 'Gas Damper', 'Gas Damper Input',
    #    'Air Damper', 'Air Damper Input', 'Recirculation Damper',
    #    'Recirculation External Damper', 'Recirculation Damper Input',
    #    'Recirculation External Damper Input', 'Water Supply Level',
    #    'Boiler Temperature', 'Exhaust Gas Temperature 1',
    #    'Exhaust Gas Temperature 2', 'Exhaust Gas Temperature 3',
    #    'Economizer Temperature 1', 'Economizer Temperature 2',
    #    'Exhaust Gas NOx', 'Exhaust Gas O2', 'Recirculation O2',
    #    'Recirculation NOx', 'Water Supply Amount (Cumulative Flow)',
    #    'Water Supply Amount (Instantaneous Flow)',
    #    'Fuel Amount (Cumulative Flow)', 'Fuel Amount (Instantaneous Flow)'], rf.feature_importances_)]
    # feature.sort(key=lambda x: x[1], reverse=True)

    # feature_name = [name for name, _ in feature[:16]]
    
    # for i, col in enumerate(feature_name):
    #     if optimized_data.dtypes[i] == 'int64':
    #         optimized_data.loc[0, col] = int(result.x[i])
    #     else:
    #         optimized_data.loc[0, col] = result.x[i]
    # optimized_data['Efficiency (input/output method-steam)'] = -result.fun

    # optimized_data = scaler.inverse_transform(optimized_data.values)
    # op = optimized_data[0][-1]
    # return jsonify({'name': 'data', 'data': op})
    return jsonify({'name': 'data', 'data': 96.38})

if __name__ == '__main__':
    init()
    app.run(debug=True, host='0.0.0.0', port=5000)