// DECLARA O OBJETO DE RELATÓRIO E SEUS ATRIBUTOS COM O MÉTODO QUE ATUALIZA O VALOR
$(document).ready(function(){
    var ALTURA, LARGURA;
    document.getElementById("icone-game").href = window.location.href.substring(0,window.location.href.length - 9) + "imagens/newRecord.png";
    $("#loaded").hide();
    $("#relInit").hide();
});
if(localStorage.getItem("partidas") == null){
        localStorage.setItem("partidas", 0);
        localStorage.setItem("novoRecord", 0);
        localStorage.setItem("maxPontos", 0);
        localStorage.setItem("somaPontos", 0);
    }
    var relatorio = {
        open: 0,
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
    };
ALTURA = window.innerHeight; // CAPTURA A ALTURA DA TELA DO USUARIO
LARGURA = window.innerWidth; //  CAPTURA A LARGURA
    
if (LARGURA >= 1000 && ALTURA <= 800){
    $(document).ready(function(){
        document.getElementById("script-layout").setAttribute('src', 'gamePc.js'); // ADICIONA O DOCUMENTO DE JOGO PARA COMPUTADOR
    });
}else if(LARGURA <= 500 && ALTURA >= 500){
    $(document).ready(function(){
        document.getElementById("script-layout").setAttribute('src', 'gameMobile.js'); // ADICIONA O DOCUMENTO DE JOGO PARA SMATPHONE
    });
}
