function openDados(){
    if(estadoAtual == estados.jogar && relatorio.open == 0 && relatorio.partidas > 2){
        document.getElementById("relat01").innerHTML = "Seu Relatorio:";
        document.getElementById("relat02").innerHTML = "Partidas jogadas: " + relatorio.partidas;
        document.getElementById("relat03").innerHTML = "Definições de record: " + relatorio.novoRecord;
        document.getElementById("relat04").innerHTML = "Pontuação Maxima atual: " + relatorio.maxPontos;
        document.getElementById("relat05").innerHTML = "Soma de todos pontos: " + relatorio.somaPontos;
        document.getElementById("relat06").innerHTML = "Sua Media Atual: " + Math.floor(relatorio.media) + "." + Math.ceil(relatorio.media);
        document.getElementById("relInit").style = "right: 0;";
        relatorio.open = 1;
    }else if(relatorio.open == 1 || estadoAtual == estados.jogando){
        document.getElementById("relInit").style = "right: -75%;";
        relatorio.open =0;
    }else if(relatorio.partidas <= 2 && estadoAtual == estados.jogar){
        document.getElementById("notific").style = "left: 0%;";
    }
}