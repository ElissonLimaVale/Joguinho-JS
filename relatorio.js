
    function openDados(){
        if(estadoAtual == estados.jogar && RELATÓRIO.hidden && relatorio.partidas > 5){
            let Media = relatorio.somaPontos / relatorio.partidas;
            document.getElementById("relat01").innerHTML = "Seu Relatorio!";
            document.getElementById("relat02").innerHTML = "Partidas jogadas: " + relatorio.partidas;
            document.getElementById("relat03").innerHTML = "Definições de record: " + relatorio.novoRecord;
            document.getElementById("relat04").innerHTML = "Pontuação Maxima atual: " + relatorio.maxPontos;
            document.getElementById("relat05").innerHTML = "Soma de todos pontos: " + relatorio.somaPontos;
            document.getElementById("relat06").innerHTML = "Sua Media Atual: " + Media.toFixed(2);
            
            document.getElementById("gameinit").style = "top: -80vh";
            RELATÓRIO.hidden = false;
            setTimeout(() =>{
                RELATÓRIO.style = "right: 0;";
            }, 100);
        }else if(!RELATÓRIO.hidden || estadoAtual == estados.jogando){
            RELATÓRIO.style = "right: -80%;";
            setTimeout(() =>{
                RELATÓRIO.hidden = true;
            }, 300);
            document.getElementById("gameinit").style = "top: calc(50% - 18%);";
        }else if(relatorio.partidas <= 5 && estadoAtual == estados.jogar){
            document.getElementById("notific").hidden = false;
            document.getElementById("gameinit").style = "top: -80vh;";
            setTimeout(() =>{
                document.getElementById("notific").style = "left: 0%;";
            }, 300);
            setTimeout(() =>{
                document.getElementById("notific").style = "left: -100%;";
                document.getElementById("gameinit").style = "top: calc(50% - 18%);";
                setTimeout(() =>{
                    document.getElementById("notific").hidden = true;
                }, 300);
            }, 4000);
        }
    }