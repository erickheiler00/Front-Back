//$( document ).ready(function() {

$(function() {
    mostrar_conteudo("conteudoInicial");

    function exibir_filmes() {
        $.ajax({
            url: 'http://localhost:5000/listar_filmes',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar (filmes) {        

            $("#corpoTabelaFilmes").empty();
            mostrar_conteudo("cadastroFilme");  

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
            }
        }
    }; 

    function mostrar_conteudo(identificador) {
        $("#cadastroFilme").addClass("d-none");
        $("#conteudoInicial").addClass("d-none");
        $("#cadastroAluguelFilme").addClass("d-none");
        $("#cadastroLocadora").addClass("d-none");
        $("#"+identificador).removeClass("d-none");

    }

    $(document).on("click", "#linkListarFilmes", function() {
        exibir_filmes();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "btIncluirFilme", function() {
        id = $("#campoId").val();
        titulo = $("campoTitulo").val();
        genero = $("campoGenero").val();
        ano = $("campoAno").val();

        var dados = JSON.stringify({ id: id, titulo: titulo, genero: genero, ano: ano });

        $.ajax({
            url: 'http://localhost:5000/incluir_filme',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: filmeIncluido,
            error: erroAoIncluir
        });

        function filmeIncluido (retorno) {
            if (retorno.resultado == "ok") {
                alert("Filme incluído com sucesso!")

                $("#campoId").val("");
                $("#campoTitulo").val("");
                $("#campoGenero").val("");
                $("#campoAno").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }

        function erroAoIncluir (retorno) {
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    $('#modalIncluirFilme').on('hide.bs.modal', function (e) {
        if (! $("#cadastroFilme").hasClass('d-none')) {
           exibir_filmes();
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
    

    function exibir_alugueis_realizados() {
        $.ajax({
            url: 'http://localhost:5000/listar_aluguel_filme',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });
    


        function listar (alugueis_realizados) {
            $('#corpoTabelaAluguelFilme').empty();

            mostrar_conteudo("cadastroAluguelFilme");

                for (var i in alugueis_realizados) {
                    lin = '<tr id="linha_aluguel_realizado'+alugueis_realizados[i].id+'">)'+
                        '<td>' + alugueis_realizados[i].data_aluguel + '</td>' +
                        '<td>' + alugueis_realizados[i].data_devolucao + '</td>' +
                        '<td>' + alugueis_realizados[i].preco + '</td>' +
                        '<td>' + alugueis_realizados[i].filme.id + '</td>' +
                        '<td>' + alugueis_realizados[i].filme.titulo + '</td>' +
                        '<td>' + alugueis_realizados[i].filme.genero + '</td>' +
                        '<td>' + alugueis_realizados[i].filme.ano + '</td>' +
                        '<td><a href=# id="excluir_aluguel_realizado' + alugueis_realizados[i].id + '"' +
                        'class="excluir_aluguel_realizado"><img src="imagens/excluir.jpg"' +
                        'alt="Excluir aluguel filme" title="Excluir aluguel filme" height="30"></a>' +
                        '</td>' +
                        "</tr>";
                    $('#corpoTabelaAluguelFilme').append(lin);
                }
        }

    }

    $(document).on("click", "#linkListarAluguelFilmeRealizado", function() {
        exibir_alugueis_realizados();
    });

    function exibir_locadora() {
        $.ajax({
            url: 'http://localhost:5000/listar_locadora',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });
    


        function listar (locadora) {
            $('#corpoTabelaLocadora').empty();

            mostrar_conteudo("cadastroLocadora");

                for (var i in locadora) {
                    lin = '<tr id="linha_locadora'+locadora[i].id+'">)'+
                        '<td>' + locadora[i].nome + '</td>' +
                        '<td>' + locadora[i].endereco + '</td>' +
                        '<td>' + locadora[i].telefone + '</td>' +
                        '<td>' + locadora[i].filme_mais_vendido + '</td>' +
                        '<td><a href=# id="excluir_locadora' + locadora[i].id + '"' +
                        'class="excluir_locadora"><img src="imagens/excluir.jpg"' +
                        'alt="Excluir locadora" title="Excluir locadora" height="30"></a>' +
                        '</td>' +
                        "</tr>";
                    $('#corpoTabelaLocadora').append(lin);
                }
        }

    }

    $(document).on("click", "#linkListarLocadora", function() {
        exibir_locadora();
    });
});




