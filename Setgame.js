//#region DEFINIÇÃO DE ÍCONE E DISPLAY NONE DE TELAS DE NOTIFICAÇÔES DO USUARIO
// define o caminho da magem de icone do site
document.getElementById("icone-game").href = window.location.href.substring(0,window.location.href.length - 9) + "imagens/morto.gif";
// faz as telas de notificação, relatório e a contagem regressiva sumirem
document.getElementById("loaded").hidden = true;
document.getElementById("notific").hidden = true;
document.getElementById("relInit").hidden = true;
//#endregion

//#region  DECLARA O OBJETO DE RELATÓRIO E SEUS ATRIBUTOS COM O MÉTODO QUE ATUALIZA O VALOR
if(localStorage.getItem("partidas") == null){
        localStorage.setItem("partidas", 0);
        localStorage.setItem("novoRecord", 0);
        localStorage.setItem("maxPontos", 0);
        localStorage.setItem("somaPontos", 0);
    }
    var relatorio = {
        partidas: parseInt(localStorage.getItem("partidas")),
        novoRecord: parseInt(localStorage.getItem("novoRecord")),
        maxPontos: parseInt(localStorage.getItem("maxPontos")),
        somaPontos: parseInt(localStorage.getItem("somaPontos")),
         
        atualiza: function(){
            this.partidas = parseInt(localStorage.getItem("partidas")),
            this.novoRecord = parseInt(localStorage.getItem("novoRecord")),
            this.maxPontos = parseInt(localStorage.getItem("maxPontos")),
            this.somaPontos = parseInt(localStorage.getItem("somaPontos"))
        }
    },
    RELATÓRIO = document.getElementById("relInit");
//#endregion

//#region REDIMECIONAMENTO DA TELA AO CARREGAR SRC DIFERENTE
var ALTURA, LARGURA;

ALTURA = window.innerHeight; // CAPTURA A ALTURA DA TELA DO USUARIO
LARGURA = window.innerWidth; //  CAPTURA A LARGURA

if (LARGURA >= 1000 && ALTURA <= 800){
        // ADICIONA O DOCUMENTO DE JOGO PARA COMPUTADOR
        document.getElementById("script-layout").setAttribute('src', 'gamePc.js');
}else if(LARGURA <= 550 && ALTURA >= 500){
        // ADICIONA O DOCUMENTO DE JOGO PARA SMATPHONE
        document.getElementById("script-layout").setAttribute('src', 'gameMobile.js'); 
}
//#endregion