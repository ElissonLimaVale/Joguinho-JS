
    function openDados(){
        if(estadoAtual == estados.jogar && relatorio.open == 0 && relatorio.partidas > 5){
            let Media = relatorio.somaPontos / relatorio.partidas;
            document.getElementById("relat01").innerHTML = "Seu Relatorio!";
            document.getElementById("relat02").innerHTML = "Partidas jogadas: " + relatorio.partidas;
            document.getElementById("relat03").innerHTML = "Definições de record: " + relatorio.novoRecord;
            document.getElementById("relat04").innerHTML = "Pontuação Maxima atual: " + relatorio.maxPontos;
            document.getElementById("relat05").innerHTML = "Soma de todos pontos: " + relatorio.somaPontos;
            document.getElementById("relat06").innerHTML = "Sua Media Atual: " + Media.toFixed(2);
            $("#relInit").show(300);
            document.getElementById("relInit").style = "right: 0;";
            relatorio.open = 1;
        }else if(relatorio.open == 1 || estadoAtual == estados.jogando){
            document.getElementById("relInit").style = "right: -80%;";
            $("#relInit").hide(500);
            relatorio.open = 0;
        }else if(relatorio.partidas <= 2 && estadoAtual == estados.jogar){
            $("#notific").show(300);
            document.getElementById("notific").style = "left: 0%;";
            relatorio.open = 1;
            setTimeout(function(){
                document.getElementById("notific").style = "left: -100%;";
                $("#notific").hide(400);
                relatorio.open = 0;
            }, 4000);
        }
    }
