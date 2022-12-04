

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from joblib import load

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
import os
print(f'INI DIRECTORY ROOT {os.getcwd()}')
model = load('train/extra_tree.model')

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]	
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():
		# Nilai default untuk variabel input atau features (X) ke model
	month = 8
	ffmc  = 81.6
	dmc = 56.7
	temp  = 27.8
	rh  = 32
	dc = 700.0
	
	if request.method=='POST':
		# Set nilai untuk variabel input atau features (X) berdasarkan input dari pengguna
		input_month = float(request.form['month'])
		input_ffmc  = float(request.form['ffmc'])
		input_dmc = float(request.form['dmc'])
		input_temp  = float(request.form['temp'])
		input_rh = float(request.form['rh'])
		input_dc  = float(request.form['dc'])
		
		df_test = pd.DataFrame(data={
			"month" : [input_month],
			"ffmc"  : [input_ffmc],
			"dmc" : [input_dmc],
			"temp"  : [input_temp],
			"rh"  : [input_rh],
			"dc" : [input_dc]
		})
		
		hasil_prediksi = model.predict(df_test[0:1])[0]
		print(hasil_prediksi)

		# Return hasil prediksi dengan format JSON
		return jsonify({
			"prediksi": hasil_prediksi
			# "gambar_prediksi" : gambar_prediksi
		})
		
	

# =[Main]========================================

if __name__ == '__main__':
	
	# Load model yang telah ditraining

	# Run Flask di localhost 
	app.run(host="localhost", port=5825, debug=False)
	
	


