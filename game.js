$(document).ready(function(){
    document.getElementById("icone-game").href = window.location.href.substring(0,window.location.href.length - 9) + "imagens/newRecord.png";
    $("#loaded").hide();
    $("#relInit").hide();
    $("#notific").hide();
});
var canvas, contex, ALTURA, ALTURA, frames = 0,tempoParada = 0,
maxPulos = 4,velocidade = 6,dificuldade, velocidaDificuldade = 5,
estadoAtual, record = 0, hard = 190, LoadNewGame = 4;
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
},
estados = {
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
},
obstaculos = {
    _obs: [],
    _obs2: [],
    cores: ["1", "2", "3", "4", "5"],
    tempoInsere:  0,
    score: 0,

    // A função insere vai inserir no array "_obs" os atributos dos objetos que ja estão sendo desenhados
    //atravéz da função "desenha". Ao inserir os atributos no array, automaticamente eles serão renderizados
    insere: function(){
        this._obs.push({ //inserindo os obstaculos no array "_obs"
            x: LARGURA,
            largura: 40, // gera uma largura aleatória probloco entre 30 e 50
            altura: 55 + Math.floor(130 * Math.random()), // gera uma altura aleatoria entre 30 e 120 px
            cor: this.cores[Math.floor(5 * Math.random() + 1)]
        },);
        this._obs2.push({ //inserindo os obstaculos no array "_obs"
            x: LARGURA,
            largura: 40, // gera uma largura aleatória probloco entre 30 e 50
            altura: ALTURA - this._obs[this._obs.length - 1].altura  - hard// gera uma altura aleatoria entre 30 e 120 px
        });
        switch(velocidaDificuldade){
            case 5:
                this.tempoInsere = 50;
                break;
            case 10:
                this.tempoInsere = 45;
                break;
            case 15:
                this.tempoInsere = 30;
                break;
            case 25:
                this.tempoInsere = 28;
            default:
                this.tempoInsere = 28;
        }
    },
    // a fução a tualizar o obstaculo se baseia em decrementar o eixo X do objeto para
    // movelo para esquereda;
    atualiza: function(){
        if(this.tempoInsere == 0 ){
            this.insere();
        }else{
            this.tempoInsere--;
        }
        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            var obs2 = this._obs2[i];
            // decrementando o eixo x com o valor da velocidade
            obs.x -= velocidade;
            obs2.x -= velocidade;
            // verifica se o bloco do jogador colidiu com o obstaculo
            if(user.x + user.largura > obs.x && obs.x - obs.largura < user.x + user.largura &&
                obs.x > user.x - user.largura && user.y + user.altura > chao.y - obs.altura){
                // se colidiu altera o estado atual para "perdeu", e chaa a função reset para zerar o jogo
                Over();
            }else if(user.x + user.largura > obs2.x && user.x < obs2.x + obs2.largura &&
                (user.y - user.altura) + 10 <= (chao.y - obs.altura) - hard){
                    // se colidiu altera o estado atual para "perdeu", e chaa a função reset para zerar o jogo
                Over();
            }
            //verificando se o objeto ja passou da tela, para apagá-lo do arry, assim evitando
            // que ele continue decrementando e isso consuma processamento!
            else if(obs.x <= -obs.largura && obs2.x <= -obs2.largura){
                this.score++;   // almenta o score/pontuação pois o obstaculo passou sem colidir
                this._obs.splice(i, 1);
                this._obs2.splice(i, 1);
                tam--; // após apagar o objeto do array, é importante decrementar as variaveis do for
                i--;  // para assim evitar erro no caso de dois ou mais objetos
            }
        }
    },
    reset: function(){ // limpa os as variaveis para o valor padrão após o jogador perder, para que o jogo começe zerado de novo
        velocidade = 6;
        frames = 0;
        velocidaDificuldade = 5;
        tempoParada = 0;
        user.gravidade = .5;
        this.score = 0;
        user.y = 80;
    },
            // o método desenha do obstáculo está sempre em execução junto com o metodo atualiza
            // para que assim que o objeto for adicionado no array ele aparêça na tela.
    desenha: function(){
        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            var obs2 = this._obs2[i];
            if(obs.cor == "1"){
                obsImage01.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage001.desenha(obs2.x,user.y,obs2.altura);
            }else if(obs.cor == "2"){
                obsImage02.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage002.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "3"){
                obsImage03.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage003.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "4"){
                obsImage04.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage004.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "5"){
                obsImage05.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage005.desenha(obs2.x,0,obs2.altura);
            }else{
                obsImage01.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage001.desenha(obs2.x,0,obs2.altura);
            }
        }
    }
};
function Over(){
    localStorage.setItem("partidas", relatorio.partidas += 1);
    if(obstaculos.score > relatorio.maxPontos){
        localStorage.setItem("maxPontos", obstaculos.score);
    }
    localStorage.setItem("somaPontos",relatorio.somaPontos += obstaculos.score);
    velocidade = 0;
    user.velocidade = 0;// pausa o bloco do usuario
    user.gravidade = 0;
    estadoAtual = estados.perdeu;
    if(obstaculos.score > record){
        localStorage.setItem("novoRecord",relatorio.novoRecord += 1);
        setRecordMemory(obstaculos.score);
        record = getRecordMemory();
        eventRecord();
    }else{
        gameOver();
    }
    relatorio.atualiza();
    LoadNewGame = 4;
}
if(getRecordMemory() != null){
    record = getRecordMemory();
}
//funçã pular
function pular(){// verifica a variavel estado e só executa a função pular se o estado estiver "estados.jogando"
    if(estadoAtual == estados.jogando){
        user.pula();
    }
    reproduz();
}
// $("#canvas").click(function(){
//     if(estadoAtual != estados.jogar && estadoAtual != estados.perdeu){
//         pular();// Chama o método pular quando é Clicado no canvas
//     }else if(estadoAtual == estados.jogar){
//         playLoad();
//     }
// });
document.getElementById("canvas").addEventListener("mousedown", function(){
    if(estadoAtual != estados.jogar && estadoAtual != estados.perdeu){
        pular();// Chama o método pular quando é Clicado no canvas
    }else if(estadoAtual == estados.jogar){
        playLoad();
    }
});
function main(){
    ALTURA = window.innerHeight; //captura a altura da tela do usuario
    LARGURA = window.innerWidth; //captura a argura da tela
    // adapta a tela para 500x600 caso a tela do usuario seja grande o suficiente
    // se não, vai apenas tomar o tamanho total da tela
    alert( LARGURA + " x " + ALTURA);
    if (LARGURA >= 1000 && ALTURA <= 800){
        LARGURA = (LARGURA / 100) * 80;
        ALTURA = (ALTURA / 100) * 80;

        imageUser = new Image();
        imageUser.src = "imagens/user.png";
        obsImage = new Image();
        obsImage.src="imagens/obsTodos.png";
        obsImageCima = new Image();
        obsImageCima.src="imagens/obsTodosCima.png";
    }else if(LARGURA >= 1300 && ALTURA >= 1400){
        LARGURA = (LARGURA / 100) * 90;
        ALTURA = (ALTURA / 100) * 70;

        imageUser = new Image();
        imageUser.src = "imagens/user.png";
        obsImage = new Image();
        obsImage.src="imagens/obsTodos.png";
        obsImageCima = new Image();
        obsImageCima.src="imagens/obsTodosCima.png";
    }
    alert( LARGURA + " x " + ALTURA);
    // criando a tela
    canvas = document.querySelector("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "5px solid rgb(0,0,0)";

    contex = canvas.getContext("2d");

    document.onkeypress = verifica;// captura se alguma tecla foi digitada, se sim chama a função verifica

    function verifica(){
        // Captura o codigo da tecla, usaremos a tecla espaço que é 32
        if(window.event.keyCode == 32){  //verifica se foi clicado na tecla de espaço para "pular"
            pular(); // se a tecla apertada for a tecla de espaço, chama a função "pular()"
        }
    }
    estadoAtual = estados.jogar;// abrindo o play no jogo
    // chama a função rodar que vai atualizar e desenhar os objetos do jogo
    rodar();
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
function desenha(){
    //O código abaixo desenha a tela de jogo
    contex.fillStyle = "#50Beff";
    contex.fillRect(0, 0, LARGURA, ALTURA);

    // desenhado o score na tela
    contex.fillStyle = "#fff";
    contex.font = "20px game_over";
    contex.fillText("SCORE: " + obstaculos.score,30,30);

    //desenha texto e com o record
    contex.fillStyle = "#fff";
    contex.font = "20px game_over";
    contex.fillText("RECORD: " + record, LARGURA - 200, 30);

    if(estadoAtual == estados.jogar && LoadNewGame == 4){
        contex.fillStyle = "#00bc2f";
        contex.font = "40px game_over";
        contex.fillText("CLIQUE PARA INICIAR!", 180, (ALTURA / 2) - 20);
    }
    //O código abaixo desenha o chão
    chao.desenha();

    if(estadoAtual == estados.jogando || estadoAtual == estados.perdeu){
        // Dsenhando e preparando os obstaculos para serem inseridos
        obstaculos.desenha();
    }
    // O código abaixo desenha o bloco que o jogador vai controlar
    user.desenha();
}
function playGame(){
    if(estadoAtual == estados.jogar){// se o estado estiver como jogar muda o estado para jogando, oque
        estadoAtual = estados.jogando     // faz o jogo inicia!
    }
    document.getElementById("notific").style = "left: -80%;";
}
main();// Inicializa o jogo
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
        document.getElementById("perdeu").style = "top: 50px;";
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
}

function eventRecord(){
    if(estadoAtual = estados.perdeu){
        document.getElementById("recordBody").style = "top: 20px;";
    }
}
function playLoad(){
    if(estadoAtual == estados.jogar){
        LoadNewGame--;
        loaded();
        if(LoadNewGame > -1){
            setTimeout(function(){
                playLoad();
            }, 1000);
        }
    }
}
function loaded(){
    if(LoadNewGame >= 0){
        $("#loaded").show();
        $("#contLoad").text(LoadNewGame);
    }else{
        $("#loaded").hide();
        playGame();
        openDados();
    }
}