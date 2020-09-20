$( document ).ready(function() {
 
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_filmes").click(function() { 
        
        $.ajax({
            url: 'http://localhost:5000/listar_filmes',
            method: 'GET',
            dataType: 'json', 
            success: listar_filmes, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });


        function listar_filmes(filmes) {          
            for (var i in filmes) {
                lin = "<tr>" +
                    "<td>" + filmes[i].id + "</td>" +
                    "<td>" + filmes[i].titulo + "</td>" +
                    "<td>" + filmes[i].genero + "</td>" +
                    "<td>" + filmes[i].ano + "</td>" +
                    "</tr>";
                $('#corpoTabelaFilmes').append(lin);              
            }; 

            $("#conteudoInicial").addClass("invisible");
            $("#tabelaFilmes").addClass("invisible");
            $("#tabelaFilmes").removeClass("invisible");
        }
    });
  });