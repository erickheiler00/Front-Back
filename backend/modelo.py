from config import * 

class Filme(db.Model): 
    # atributos do filme 
    id = db.Column(db.Integer, primary_key=True) 
    titulo = db.Column(db.String(254)) 
    genero = db.Column(db.String(254)) 
    ano = db.Column(db.String(254)) 
 
    # método para expressar o filme em forma de texto 
    def __str__(self): 
        return str(self.id)+") "+ self.titulo + ", " +\
             self.genero + ", " + self.ano
    
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "genero": self.genero,
            "ano": self.ano
        }

class AluguelFilme(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    data_aluguel = db.Column(db.String(254)) 
    data_devolucao = db.Column(db.String(254)) 
    preco = db.Column(db.String(254)) 
    filme_id = db.Column(db.Integer, db.ForeignKey(Filme.id), nullable=False) 
    filme = db.relationship("Filme")

    def __str__(self):
        return f"{self.data_aluguel}, {self.data_devolucao}, " + \
            f"{self.preco}, {self.filme}"

    def json(self):
        return {
            "id": self.id,
            "data_aluguel": self.data_aluguel,
            "data_devolucao": self.data_devolucao,
            "preco": self.preco,
            "filme_id": self.filme_id,
            "filme": self.filme.json()
        }


class Locadora(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    nome = db.Column(db.String(254)) 
    endereco = db.Column(db.String(254)) 
    telefone = db.Column(db.String(254)) 
    filme_id = db.Column(db.Integer, db.ForeignKey(Filme.id)) 
    filme_mais_vendido = db.relationship("Filme")

    def __str__(self):
        s = f"Locadora {self.nome} localizada em {self.endereco} com telefone {self.telefone}"
        if self.filme_mais_vendido != None:
            s += f", filme mais vendido desta locadora foi {self.filme_mais_vendido}"
        return s

    def json(self):
        if self.filme_mais_vendido is None:
            filme_id = ""
            filme_mais_vendido = ""

        else:
            filme_id = self.filme_id
            filme_mais_vendido = self.filme_mais_vendido.json()

        return {
            "id": self.id,
            "nome": self.nome,
            "endereco": self.endereco,
            "telefone": self.telefone,
            "filme_id": filme_id,
            "filme_mais_vendido": filme_mais_vendido
        }

# teste 
if __name__ == "__main__": 
    # apagar o arquivo, se houver 
    if path.exists(arquivobd): 
        remove(arquivobd) 
 
    # criar tabelas 
    db.create_all() 
 
    # teste da classe Filme 
    filme1 = Filme(titulo = "Titanic", genero = "Drama / Romance", 
        ano = "1997") 
    filme2 = Filme(titulo = "A Cabana", genero = "Drama", 
        ano = "2017") 
    filme3 = Filme(titulo = "Até Que a Sorte nos Separe", genero = "Comédia", 
        ano = "2012")
    filme4 = Filme(titulo = "Intocáveis", genero = "Drama / Comédia", 
        ano = "2011")
    filme5 = Filme(titulo = "Rota de Fuga", genero = "Suspense / Ação", 
        ano = "2013")


    aluguel1 = AluguelFilme(data_aluguel = "03/10/2020", data_devolucao = "04/10/2020",
        preco = "R$4,00", filme = filme1)
    aluguel2 = AluguelFilme(data_aluguel = "10/10/2020", data_devolucao = "13/10/2020",
        preco = "R$16,00", filme = filme2)
    aluguel3 = AluguelFilme(data_aluguel = "17/10/2020", data_devolucao = "19/10/2020",
        preco = "R$8,00", filme = filme3)
    aluguel4 = AluguelFilme(data_aluguel = "24/10/2020", data_devolucao = "26/10/2020",
        preco = "R$8,00", filme = filme4)
    aluguel5 = AluguelFilme(data_aluguel = "31/10/2020", data_devolucao = "01/11/2020",
        preco = "R$4,00", filme = filme5)    
 

    locadora1 = Locadora(nome = "Video Arte Locadora", endereco = "R. Dois de Setembro, 459",
        telefone = "(47) 3323-7897", filme_mais_vendido = filme1)
    locadora2 = Locadora(nome = "Universal Video Locadora", endereco = "R. Amazonas, 466",
        telefone = "(47) 3041-1213", filme_mais_vendido = filme2)
    locadora3 = Locadora(nome = "Artcine Video Locadora", endereco = "R. Curt Hering, 154",
        telefone = "(47) 3035-7272", filme_mais_vendido = filme3)
    locadora4 = Locadora(nome = "Blu Video Locadora", endereco = "R. Carl Dettmer, 53",
        telefone = "(47) 3337-3229", filme_mais_vendido = filme4)
    locadora5 = Locadora(nome = "Mega Vídeo Locadora", endereco = "R. dos Caçadores, 2306",
        telefone = "(47) 3328-4381", filme_mais_vendido = filme5)


    # persistir 
    db.session.add(filme1) 
    db.session.add(filme2) 
    db.session.add(filme3)
    db.session.add(filme4)
    db.session.add(filme5)

    db.session.add(aluguel1)
    db.session.add(aluguel2)
    db.session.add(aluguel3)
    db.session.add(aluguel4)
    db.session.add(aluguel5)

    db.session.add(locadora1)
    db.session.add(locadora2)
    db.session.add(locadora3)
    db.session.add(locadora4)
    db.session.add(locadora5)

    
    db.session.commit() 
 
    # exibir filmes, aluguel e locadora 
    print("PRINTS:")
    print("")
    print(filme1)
    print(filme2)
    print(filme3)
    print(filme4)
    print(filme5)
    print("")

    print(aluguel1)
    print(aluguel2)
    print(aluguel3)
    print(aluguel4)
    print(aluguel5)
    print("")

    print(locadora1)
    print(locadora2)
    print(locadora3)
    print(locadora4)
    print(locadora5)
    print("")

    # exibir filmes, aluguel e locadora em formato json
    print("PRINTS EM FORMATO JSON:")
    print("")
    print(filme1.json())
    print(filme2.json())
    print(filme3.json())
    print(filme4.json())
    print(filme5.json())
    print("")

    print(aluguel1.json())
    print(aluguel2.json())
    print(aluguel3.json())
    print(aluguel4.json())
    print(aluguel5.json())
    print("")

    print(locadora1.json())
    print(locadora2.json())
    print(locadora3.json())
    print(locadora4.json())
    print(locadora5.json())
    print("")

    

   

    

