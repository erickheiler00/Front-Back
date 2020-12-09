$( document ).ready(function() {
 
    $("#conteudoInicial").removeClass("invisible");

    $("#link_listar_filmes").click(function() { 
    
    function mostrar_filmes() {
        $.ajax({
            url: 'http://localhost:5000/listar/Filme',
            method: 'GET',
            dataType: 'json', 
            success: listar_filmes, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar_filmes(filmes) {        

            $("#corpoTabelaFilmes").empty();
            mostrar_conteudo("filmes");  

            for (var i in filmes) {
                lin = '<tr id="linha_filme_'+filmes[i].id+'">' +
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

        function mostrar_aluguel_filme() {
            $.ajax({
                url: 'http://localhost:5000/listar/AluguelFilme',
                method: 'GET',
                dataType: 'json',
                success: listar_aluguel_filme,
                error: function () {
                    alert("erro ao ler dados, verifique o backend");
                }
            });
        }    


        function listar_aluguel_filme (aluguel_filme) {
            $('#corpoTabelaAluguelFilme').empty();

            mostrar_conteudo("aluguel_filme");

                for (var i in aluguel_filme) {
                    lin = '<tr id="linha_aluguel_filme_'+aluguel_filme[i].id+'">)'+
                        '<td>' + aluguel_filme[i].data_aluguel + '</td>' +
                        '<td>' + aluguel_filme[i].data_devolucao + '</td>' +
                        '<td>' + aluguel_filme[i].preco + '</td>' +
                        '<td>' + aluguel_filme[i].filme_id + '</td>' +
                        '<td>' + aluguel_filme[i].filme + '</td>' 
                        '<td><a href=# id="excluir_' + aluguel_filme[i].id + '"' +
                        'class="excluir_aluguel_filme"><img src="imagens/excluir.jpg"' +
                        'alt="Excluir aluguel filme" title="Excluir aluguel filme" height="30"></a>' +
                        '</td>' +
                        "</tr>";
                    $('#corpoTabelaAluguelFilme').append(lin);
                }
        };

        function mostrar_locadora() {
            $.ajax({
                url: 'http://localhost:5000/listar/Locadora',
                method: 'GET',
                dataType: 'json',
                success: listar_locadora,
                error: function () {
                    alert("erro ao ler dados, verifique o backend");
                }
            })
        }


        function listar_locadora(locadora) {
            $('#corpoTabelaLocadora').empty();

            mostrar_conteudo("locadora");

            for (var i in locadora) {
                lin = '<tr id="linha_locadora_'+locadora[i].id+'">)'+
                    '<td>' + locadora[i].nome + '</td>' +
                    '<td>' + locadora[i].endereco + '</td>' +
                    '<td>' + locadora[i].telefone + '</td>' +
                    '<td>' + locadora[i].filme_id + '</td>' +
                    '<td>' + locadora[i].filme_mais_vendido + '</td>' 
                    '<td>' + locadora[i].filme.id + '</td>' 
                    '<td>' + locadora[i].filme.titulo + '</td>' 
                    '<td>' + locadora[i].filme.genero + '</td>' 
                    '<td>' + locadora[i].filme.ano + '</td>' 
                    '<td><a href=# id="excluir_' + locadora[i].id + '"' +
                    'class="excluir_locadora"><img src="imagens/excluir.jpg"' +
                    'alt="Excluir locadora" title="Excluir locadora" height="30"></a>' +
                    '</td>' +
                    "</tr>";
                $('#corpoTabelaLocadora').append(lin);
            }
        }

        function mostrar_conteudo(identificador) {
            $("filmes").addClass("d-none");
            $("aluguel_filme").addClass("d-none");
            $("locadora").addClass("d-none");
            $("#conteudoInicial").addClass("d-none");
            $('#${identificador}').removeClass("d-none");
        }


        $(document).on("click", "#mostrar_filmes", () => { 
            mostrar_filmes();
        });

        $(document).on("click", "#mostrar_aluguel_filme", () => { 
            mostrar_aluguel_filme();
        });

        $(document).on("click", "#mostrar_locadora", () => { 
            mostrar_locadora();
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

    $('#modalIncluirFilme').on('hide.bs.modal', function (e) {
        if (! $("#tabelaFilmes").hasClass('d-none')) {
           mostrar_filmes();
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

    mostrar_resultado("conteudoInicial")

});
