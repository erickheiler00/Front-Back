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

    $("#btn_incluir_filme").click(function() { 

        id = $("#id").val();
        titulo = $("#titulo").val();
        genero = $("#genero").val();
        ano = $("#ano").val();

        dados = JSON.stringify({id: id, titulo: titulo, 
            genero: genero, ano: ano});

        $.ajax({
            url : 'http://localhost:5000/incluir_filme',
            type : 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: dados,
            success: incluirFilme,
            error: erroIncluirFilme
        });
        function incluirFilme(resposta) {
            if (resposta.resultado == "ok") {
                alert('Filme incluído com sucesso');

                $("#id_filme").val("");
                $("#titulo").val("");
                $("#genero").val("");
                $("#ano").val("");
            } else {
                alert('erro na comunicação');
            }
        }
        function erroIncluirFilme(resposta) {
            alert("Algo de errado não está certo na chamada ao back-end");
        }

    });

});