from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from werkzeug.serving import WSGIRequestHandler
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'epboil'

mysql = MySQL(app)

@app.route('/api', methods=['GET'])
def api_root():
    return jsonify({'message': 'Hello, World!'})

@app.route('/ModeltoDB', methods=['GET'])
def api_model_DB():
    WSGIRequestHandler.timeout = 100000
    cursor = mysql.connection.cursor()
    query = "INSERT INTO ai (name, data) VALUES (%s, %s)"
    file_name = ['random_forest.pkl', 'reduced_random_forest.pkl', 'scaler.pkl', 'differential_evolution.pkl']
    for i in range(1,3):
        binary_data = open(file_name[i], 'rb').read()
        cursor.execute(query, (file_name[i], binary_data))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Model has been saved to the database'})

@app.route('/preprocessing', methods=['GET'])
def img_preprocessing():
    with open('preprocessing_img.jpg', 'rb') as img_file:
        img_data = img_file.read()
        img_base64 = base64.b64encode(img_data).decode('utf-8')
    return jsonify({'name': 'data.jpg', 'data': img_base64})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)