from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from werkzeug.serving import WSGIRequestHandler


app = Flask(__name__)

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
    file_name = ['random_forest.pkl', 'reduced_random_forest.pkl', 'scaler.pkl']
    for i in range(1,3):
        binary_data = open(file_name[0], 'rb').read()
        cursor.execute(query, (file_name[0], binary_data))
    mysql.connection.commit()
    cursor.close()
    return jsonify({'message': 'Model has been saved to the database'})


if __name__ == '__main__':
    app.run(debug=True)