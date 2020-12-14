from config import app, db, jsonify, request
from modelo import Filme, AluguelFilme, Locadora
 

@app.route("/")
def main():
    return 'Sistema de cadastro de filmes.' + '<a href="/listar_filmes">Operação listar</a>'


@app.route("/listar_filmes") 
def listar_filmes(): 
    filmes = db.session.query(Filme).all() 
    filmes_em_json = [ filme.json() for filme in filmes ]
    resposta = jsonify(filmes_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta   

@app.route("/incluir_filme", methods=['post'])
def incluir_filme():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        novo_filme = Filme(**dados)
        db.session.add(novo_filme)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/excluir_filme/<int:filme_id>", methods=['DELETE']) 
def excluir_filme(filme_id): 
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"}) 
    try: 
        Filme.query.filter(Filme.id == filme_id).delete() 
        db.session.commit() 
    except Exception as e: 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta 

@app.route("/listar_aluguel_filme")
def listar_aluguel_filme():
    aluguel_filme = db.session.query(AluguelFilme).all()
    lista_jsons = [ x.json() for x in aluguel_filme ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta 

@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "Filme":
        dados = db.session.query(Filme).all()
    elif classe == "AluguelFilme":
        dados = db.session.query(AluguelFilme).all()
    elif classe == "Locadora":
        dados = db.session.query(Locadora).all()
        
    lista_jsons = [ x.json() for x in dados ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

