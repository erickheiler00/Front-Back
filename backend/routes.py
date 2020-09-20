from config import * 
from modelo import Filme
 
@app.route("/") 
def main(): 
    return 'Sistema de cadastro de filmes.' + '<a href="/listar_filmes">Operação listar</a>' 
 
@app.route("/listar_filmes") 
def listar_filmes(): 
    # obter os filmes do cadastro 
    filmes = db.session.query(Filme).all() 
    # fornecer a lista de filmes para a página que exibe as pessoas 
    filmes_em_json = [ filme.json() for filme in filmes ]
    resposta = jsonify(filmes_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta    
