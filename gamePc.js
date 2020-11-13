
// objeto Predio
var Predio = {
    x: 0,
    y: 112,
    desenha: function(){
        if(this.x >= -500){
            obsPredio.desenha( this.x - 45,this.y,340);
        }
    },
    atualiza: function(){
        this.x -= velocidade;
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
            largura: 60, // gera uma largura aleatória probloco entre 30 e 50
            altura: 55 + Math.floor(130 * Math.random()), // gera uma altura aleatoria entre 30 e 120 px
            cor: this.cores[Math.floor(5 * Math.random() + 1)]
        },);
        this._obs2.push({ //inserindo os obstaculos no array "_obs"
            x: LARGURA,
            largura: 60, // gera uma largura aleatória probloco entre 30 e 50
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
            }else if(user.x + user.largura > obs2.x - 2 && user.x < obs2.x + obs2.largura  - 2 &&
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
    // ZERA OS VALORES DE JOGO PARA REINICIAR OS OBSTACULOS
    reset: function(){
        velocidade = 6;
        velocidaDificuldade = 5;
        user.gravidade = .5;
        frames = 0;
        tempoParada = 0;
        this.score = 0;
        user.y = 80;
        Predio.x = 10;
    },

    // MÉTODO QUE RENDERIZA OS OBSTACULOS
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
if(getRecordMemory() != null){
    record = getRecordMemory();
} 
function main(){
    //VALORES DE DIMENÇÃ DA TELA VELOCIDADE E LOGICA DE JOGO PARA MOBILE
    LARGURA = (LARGURA / 100) * 80;
    ALTURA = (ALTURA / 100) * 75;

    // criando a tela
    canvas = document.querySelector("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "5px solid rgb(0,0,0)";
    // DECLARA AS IMAGENS USADAS NO JOGO
    imageUser = new Image();
    imageUser.src = "imagens/user.png";
    obsImage = new Image();
    obsImage.src = "imagens/obsTodosPc.png";
    obsImageCima = new Image();
    obsImageCima.src="imagens/obsTodosCimaPc.png";
    obsPredioNinho = new Image();
    obsPredioNinho.src="imagens/prediocomninho.png";
    contex = canvas.getContext("2d");

    // PULA OU INICIA O JOGO
    document.getElementById("canvas").addEventListener("mousedown", function(){
        if(estadoAtual != estados.jogar && estadoAtual != estados.perdeu){
            pular();// Chama o método pular quando é Clicado no canvas
        }else if(estadoAtual == estados.jogar && relatorio.open != 1){
            playLoad();
        }
    });
    // CAPTURA TECLAS DIGITADAS E SE A TECLA FOR ESPAÇO EXECUTA A FUNÇÃO PULAR
    document.onkeypress = function(){
        if(window.event.keyCode == 32){
            pular();
        }
    };
    estadoAtual = estados.jogar;
    rodar();
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
    
    //O código abaixo desenha o chão
    chao.desenha();

    if(estadoAtual == estados.jogando || estadoAtual == estados.perdeu){
        // Dsenhando e preparando os obstaculos para serem inseridos
        obstaculos.desenha();
    }
    // O código abaixo desenha o bloco que o jogador vai controlar
    user.desenha();
    //desenha o prédio com o ninho
    Predio.desenha();

    if(estadoAtual == estados.jogar && LoadNewGame == 4){
        contex.fillStyle = "#00bc2f";
        contex.font = "40px game_over";
        contex.fillText("CLIQUE PARA INICIAR", 200, (ALTURA / 2) - 20);
    }
}

function setRecordMemory(record){
    localStorage.setItem("RecordMax", record);
}
function getRecordMemory(){
    var record = localStorage.getItem("RecordMax", obstaculos.score);
    return record;
}
main();