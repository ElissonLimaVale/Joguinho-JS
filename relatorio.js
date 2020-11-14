
    function openDados(){
        if(estadoAtual == estados.jogar && RELATÓRIO.hidden && relatorio.partidas > 5){
            let Media = relatorio.somaPontos / relatorio.partidas;
            document.getElementById("relat01").innerHTML = "Seu Relatorio!";
            document.getElementById("relat02").innerHTML = "Partidas jogadas: " + relatorio.partidas;
            document.getElementById("relat03").innerHTML = "Definições de record: " + relatorio.novoRecord;
            document.getElementById("relat04").innerHTML = "Pontuação Maxima atual: " + relatorio.maxPontos;
            document.getElementById("relat05").innerHTML = "Soma de todos pontos: " + relatorio.somaPontos;
            document.getElementById("relat06").innerHTML = "Sua Media Atual: " + Media.toFixed(2);
            RELATÓRIO.hidden = false;
            setTimeout(function(){
                RELATÓRIO.style = "right: 0;";
            }, 100);
        }else if(!RELATÓRIO.hidden || estadoAtual == estados.jogando){
            RELATÓRIO.style = "right: -80%;";
            setTimeout(function(){
                RELATÓRIO.hidden = true;
            }, 1000);
        }else if(relatorio.partidas <= 5 && estadoAtual == estados.jogar){
            document.getElementById("notific").hidden = false;
            document.getElementById("notific").style = "left: 0%;";
            setTimeout(function(){
                document.getElementById("notific").style = "left: -100%;";
                setTimeout(function(){
                    document.getElementById("notific").hidden = true;
                }, 1000);
            }, 4000);
        }
    }