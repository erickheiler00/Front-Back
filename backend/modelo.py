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

    
 
    # persistir 
    db.session.add(filme1) 
    db.session.add(filme2) 
    db.session.add(filme3)
    db.session.add(filme4)
    db.session.add(filme5)
    
    db.session.commit() 
 
    # exibir 
    print(filme1)
    print(filme2)
    print(filme3)
    print(filme4)
    print(filme5)
    print("")

    # exibir a pessoa no format json
    print(filme1.json())
    print(filme2.json())
    print(filme3.json())
    print(filme4.json())
    print(filme5.json())
