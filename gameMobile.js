
// objeto Predio
var Predio = {
    x: 0,
    y: 140,
    desenha: function(){
        if(this.x >= -500){
            obsPredio.desenha( this.x - 20,this.y,325);
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
                this.tempoInsere = 80;
                break;
            case 10:
                this.tempoInsere = 75;
                break;
            case 15:
                this.tempoInsere = 70;
                break;
            case 25:
                this.tempoInsere = 65;
            case 25:
                this.tempoInsere = 50;
            default:
                this.tempoInsere = 45;
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
            if(user.x + user.largura - tolerancia  >= obs.x && user.x <= obs.x + obs.largura - tolerancia &&
                user.y + user.altura >= chao.y - obs.altura){
                // se colidiu altera o estado atual para "perdeu", e chaa a função reset para zerar o jogo
                Over();
            }else if(user.x + user.largura - tolerancia >= obs2.x && user.x - tolerancia <= obs2.x + obs2.largura &&
                (user.y - user.altura) + tolerancia <= (chao.y - obs.altura) - hard){
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
                pontoPlay();
            }
        }
    },
    // ZERA OS VALORES DE JOGO PARA REINICIAR OS OBSTACULOS
    reset: function(){
        velocidade = 3;
        velocidaDificuldade = 5;
        user.gravidade = .32;
        frames = 0;
        tempoParada = 0;
        this.score = 0;
        user.y = Predio.y - user.altura;
        Predio.x = 10;
        user.forcaDoPulo = 6;
        imageUser.src = "imagens/user.png";
    },

    // MÉTODO QUE RENDERIZA OS OBSTACULOS
    desenha: function(){
        for(var i = 0, tam = this._obs.length; i < tam; i++){
            var obs = this._obs[i];
            var obs2 = this._obs2[i];
            if(obs.cor == "1"){
                obsImage01cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage001cel.desenha(obs2.x,user.y,obs2.altura);
            }else if(obs.cor == "2"){
                obsImage02cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage002cel.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "3"){
                obsImage03cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage003cel.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "4"){
                obsImage04cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage004cel.desenha(obs2.x,0,obs2.altura);
            }else if(obs.cor == "5"){
                obsImage05cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage005cel.desenha(obs2.x,0,obs2.altura);
            }else{
                obsImage01cel.desenha(obs.x,chao.y - obs.altura,obs.altura);
                obsImage001cel.desenha(obs2.x,0,obs2.altura);
            }
        }
    }
};
if(getRecordMemory() != null){
    record = getRecordMemory();
} 
// INICIA O JOGO NA VERSÃO MOBILE-CELULAR
function main(){
    //VALORES DE DIMENÇÃ DA TELA VELOCIDADE E LOGICA DE JOGO PARA MOBILE
    LARGURA = (LARGURA / 100) * 95;
    ALTURA = (ALTURA / 100) * 70;
    tolerancia = 4.5;

    velocidade = 3;
    velocidaDificuldade = 5;
    user.gravidade = .32;
    user.forcaDoPulo = 6;
    
    // CRIA A TELA - CANVAS
    canvas = document.querySelector("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "5px solid rgb(0,0,0)";

    // DECLARA AS IMAGENS USADAS NO JOGO
    imageUser = new Image();
    imageUser.src = "imagens/user.png";
    obsImage = new Image();
    obsImage.src="imagens/obsTodos.png";
    obsImageCima = new Image();
    obsImageCima.src="imagens/obsTodosCima.png";
    contex = canvas.getContext("2d");
    obsPredioNinho = new Image();
    obsPredioNinho.src="imagens/prediocomninho1.png";

    document.getElementById("click-cell").addEventListener("touchstart",() => {
        if(estadoAtual != estados.jogar && estadoAtual != estados.perdeu){
            pular();// Chama o método pular quando é Clicado no canvas
        }else if(estadoAtual == estados.jogar && relatorio.open != 1){
            setTimeout(() => {playLoad();}, 300);
        }
    });
    
    estadoAtual = estados.jogar;
    user.y = Predio.y - user.altura;
    rodar();
}
function desenha(){
    //O código abaixo desenha a tela de jogo
    contex.fillStyle = "#50Beff";
    contex.fillRect(0, 0, LARGURA, ALTURA);

    //O código abaixo desenha o chão
    chao.desenha();

    if(estadoAtual == estados.jogando || estadoAtual == estados.perdeu){
        // Dsenhando e preparando os obstaculos para serem inseridos
        obstaculos.desenha();
    }
    // O código abaixo desenha o bloco que o jogador vai controlar
    user.desenha();

     // desenhado o score na tela
     contex.fillStyle = "#fff";
     contex.font = "14px game_over";
     contex.fillText("SCORE: " + obstaculos.score,20,20);
 
     //desenha texto e com o record
     contex.fillStyle = "#fff";
     contex.font = "14px game_over";
     contex.fillText("RECORD: " + record, LARGURA - 140, 20);
     //desenha o prédio com o ninho

    Predio.desenha();

}

function setRecordMemory(record){
    localStorage.setItem("RecordMax", record);
}
function getRecordMemory(){
    var record = localStorage.getItem("RecordMax", obstaculos.score);
    return record;
}
main();