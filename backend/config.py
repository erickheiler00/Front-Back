# importações 
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy 
import json
import os
from os import path, remove
from flask_cors import CORS
 
 
# configurações 
app = Flask(__name__) 
CORS(app)

# caminho do arquivo de banco de dados 
caminho = path.dirname(path.abspath(__file__)) 
arquivobd = path.join(caminho, 'filmes.db') 

# sqlalchemy 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + arquivobd 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # remover warnings 
db = SQLAlchemy(app)
