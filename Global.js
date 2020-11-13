
// VARIÁVEIS DE JOGO
var canvas, contex, frames = 0,tempoParada = 0, celular = false, Timeout,
maxPulos = 4,velocidade = 6,dificuldade, velocidaDificuldade = 5,
estadoAtual, record = 0, hard = 190, LoadNewGame = 4;

const estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
},
// esse é um tipo de variavel que pode ter varios valores e pode também ter funções, como se fosse uma classe.
chao = { 
    y: 0,
    altura: 50,
    cor: "rgb(56, 60, 61)",
    // desenha a tela principal do jogo
    desenha: function(){
        this.y = ALTURA - 50;
        contex.fillStyle = this.cor;
        contex.fillRect(0, this.y, LARGURA, this.altura);
    }
},
user = {
    x: 50,
    y: 80,
    altura: 50,
    largura: 50,
    cor: "rgb(254, 150, 3)",
    gravidade: .5,
    velocidade: 0,
    forcaDoPulo: 8,
    //faz com que o bloco caia, atualizando a pocição no eixo Y
    // almentando a distancia em cada chamada da função, cimulando uma gravidade.
    atualiza: function(){
        this.velocidade += this.gravidade;
        this.y += this.velocidade;
        // O código abaixo faz com que o bloco pare de cair, travando o vaor do eixo y 
        if(this.y > chao.y - this.altura){
            this.y = chao.y - this.altura;
            this.velocidade = 0;
            Over();
        }
    },

    // inverte a velocidade para um valor negativo
    // assim, em vêz de descer o bloco vai subir, depois cair
    // fazendo com que ele pule.
    pula: function(){
            this.velocidade = - this.forcaDoPulo;
    },
    //desenha o bloco que o jogador vai controlar
    desenha: function(){
        userImage.desenha(this.x,this.y);
    }
}
// REGISTRAS OS DADOS DA PARTODA PARA O RELATÓRIO E ZERA ALGUNS VALORES DE PARA REINICAR O JOGO
function Over(){
    localStorage.setItem("partidas", relatorio.partidas += 1);
    velocidade = 0;
    user.velocidade = 0;// pausa o bloco do usuario
    user.gravidade = 0;
    estadoAtual = estados.perdeu;
    if(obstaculos.score > relatorio.maxPontos){
        localStorage.setItem("maxPontos", obstaculos.score);
    }
    if(obstaculos.score > record){
        localStorage.setItem("novoRecord",relatorio.novoRecord += 1);
        setRecordMemory(obstaculos.score);
        record = getRecordMemory();
        eventRecord();
    }else{
        gameOver();
    }
    localStorage.setItem("somaPontos",relatorio.somaPontos += obstaculos.score);
    relatorio.atualiza();
}
// VERIFICA SE O JOGO ESTA EM ANDAMENTO PARA EXECUTAR A FUNÇÃO PULAR
function pular(){
    if(estadoAtual == estados.jogando){
        user.pula();
    }
    reproduz();
}
function rodar(){
    atualiza();
    desenha();
    window.requestAnimationFrame(rodar); // Criando um loop infinito que vai ficar executando a função rodar infinitamente.
}
function atualiza(){
    if(estadoAtual == estados.jogando){// inicia o jogo se o estadoAtual estiver com "jogando"
        //chamando o calculo que decrementa os obstaculos no eixo X fazendo com que eles
        //se movam para a esquerda, variando a velocidade atravéz da decrementação.
        obstaculos.atualiza();
        Predio.atualiza();
        frames++;
        if(obstaculos.score >= velocidaDificuldade * 2){
            velocidaDificuldade += 5;
        }
        //chamando o calculo de gravidade, que vai atualizar a posiçã dele no eixo Y
        user.atualiza();        
    }
    if(estadoAtual == estados.jogar){
        obstaculos.reset();
    }
}

function playGame(){
    user.y -= 10;
    if(estadoAtual == estados.jogar){// se o estado estiver como jogar muda o estado para jogando, oque
        estadoAtual = estados.jogando     // faz o jogo inicia!
    }
    document.getElementById("notific").style = "left: -100%;";
}
// processamento do audio do jogo.
function reproduz(){       
    if(estadoAtual != estados.jogando){
        var audio = document.getElementById('click02');
    }else if(estadoAtual != estados.jogar || estadoAtual != estados.perdeu){
        var audio = document.getElementById('click01');
    }
    var audio01 = document.getElementById('click03');
    if(estadoAtual == estados.jogando){
        audio01.play();
    }else{
        audio01.pause();
    }
    audio.play();
}   
function pausar(){
    if(estadoAtual == estados.jogando){
        var audio = document.getElementById('click01');
    }else{
        var audio = document.getElementById('click01');
    }
    audio.pause();
}
function gameOver(){
    if(estadoAtual == estados.perdeu){
        document.getElementById("perdeu").style = "top: 15vh;";
        document.getElementById("h1pontos").innerHTML = "score: "+ obstaculos.score;
        document.getElementById("h1record").innerHTML = "record: "+ record;
    }
}
function newGame(){
    document.getElementById("perdeu").style = "top: -600px;";
    document.getElementById("recordBody").style = "top: -600px;";
    estadoAtual = estados.jogar;
    obstaculos._obs = [];
    obstaculos._obs2 = [];
    LoadNewGame = 4;
}

function eventRecord(){
    $("#record-h2").text("BEST " + record);
    if(estadoAtual = estados.perdeu){
        document.getElementById("recordBody").style = "top: 15vh;";
    }
}
function playLoad(){
    if(LoadNewGame > 3){document.getElementById("notific").style = "left: -100%;";}
    if(estadoAtual == estados.jogar){
        LoadNewGame--;
        loaded();
        if(LoadNewGame > -1){
            clearTimeout(Timeout);
            Timeout = setTimeout(function(){
                playLoad();
            }, 1000);
        }
    }
}
function loaded(){
    LoadNewGame < 0 ? 0 : reproduz();
    if(LoadNewGame >= 0){
        $("#loaded").show();
        $("#contLoad").text(LoadNewGame);
    }else{
        $("#loaded").hide();
        playGame();
        openDados();
    }
}