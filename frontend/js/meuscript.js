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
                lin = '<tr id="linha_'+filmes[i].id+'">' +
                    "<td>" + filmes[i].id + "</td>" +
                    "<td>" + filmes[i].titulo + "</td>" +
                    "<td>" + filmes[i].genero + "</td>" +
                    "<td>" + filmes[i].ano + "</td>" +
                    '<td><a href=# id="excluir_' + filmes[i].id + '"' +
                    'class="excluir_filme"><img src="imagens/excluir.jpg"' +
                    'alt="Excluir filme" title="Excluir filme" height="30"></a>' +
                    '</td>' +
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

    $(document).on("click", ".excluir_filme", function() {
        var componente_clicado = $(this).attr('id');
        var nome_icone = "excluir_";
        var id_filme = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url:'http://localhost:5000/excluir_filme/'+id_filme,
            type: 'DELETE',
            dataType: 'json',
            success: filmeExcluido,
            error: erroAoExcluir
        });

        function filmeExcluido (retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_filme).fadeOut(1000, function(){
                    alert("Filme removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
});
