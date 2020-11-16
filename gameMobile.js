record = getRecordMemory() != null? getRecordMemory() : 0;

//#region OBEJATOS DE JOGO
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
},nuvemInit = {
    x: 180,
    y: 80,
    desenha: function(){
        if(this.x >= -500){
            nuvem1.desenha( this.x - 4,this.y,340);
        }
    },
    atualiza: function(){
        this.x -= velocidade - 2;
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
            }else if(user.x + user.largura - (tolerancia * 2) >= obs2.x && user.x - (tolerancia * 2) <= obs2.x + obs2.largura &&
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
},
nuvem = {
    _nuv: [],
    tempoInsere:  0,
    options: ["1", "2", "3"],
    insere: function(){
        this._nuv.push({ //inserindo os obstaculos no array "_nuv"
            x: LARGURA + Math.floor(120 * Math.random()),
            y: Math.floor(180 * Math.random()),
            largura: 320,
            altura: 100, 
            option: this.options[Math.floor(3 * Math.random() + 1)]
        });
        switch(velocidaDificuldade){
            case 5:
                this.tempoInsere = 400;
                break;
            case 10:
                this.tempoInsere = 350;
                break;
            case 15:
                this.tempoInsere = 300;
                break;
            case 25:
                this.tempoInsere = 250;
                break
            default:
                this.tempoInsere = 200;
                break
        }
    },
    atualiza: function(){
        this.tempoInsere <= 0 ? this.insere(): this.tempoInsere--;
          
        for(var i = 0, tam = this._nuv.length; i < tam; i++){
            var nuv = this._nuv[i];
            nuv.x -= velocidade - 2;
            if(nuv.x <= -nuv.largura){
                this._nuv.splice(i, 1);
                tam--; // após apagar o objeto do array, é importante decrementar as variaveis do for
                i--;  // para assim evitar erro no caso de dois ou mais objeto
            }
        }
    },
    desenha: function(){
        for(var i = 0, tam = this._nuv.length; i < tam; i++){
            var nuv = this._nuv[i];
            switch(nuv.option){
                case "1":
                    nuvem1.desenha(nuv.x,nuv.y,nuv.altura);
                    break;
                case "2":
                    nuvem2.desenha(nuv.x,nuv.y,nuv.altura);
                    break;
                case "3":
                    nuvem3.desenha(nuv.x,nuv.y,nuv.altura);
                    break;
                default:
                    nuvem1.desenha(nuv.x,nuv.y,nuv.altura);
            }
            
        }
    },
    reset: function(){
        this._nuv = [];
        nuvemInit.x = 180;
    }
};
//#endregion

//#region  INICIA O JOGO NA VERSÃO MOBILE-CELULAR
function main(){
    //VALORES DE DIMENÇÃ DA TELA VELOCIDADE E LOGICA DE JOGO PARA MOBILE
    LARGURA = (LARGURA / 100) * 95;
    ALTURA = (ALTURA / 100) * 70;
    if(ALTURA > 750){
        LARGURA = (LARGURA / 100) * 80;
        ALTURA = (ALTURA / 100) * 60;
    }

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
    nuvemImage = new Image();
    nuvemImage.src = "imagens/nuvemGame.png";

    document.getElementById("click-cell").addEventListener("touchstart",() => {
        if(estadoAtual != estados.jogar && estadoAtual != estados.perdeu){
            pular();// Chama o método pular quando é Clicado no canvas
        }else if(estadoAtual == estados.jogar && RELATÓRIO.hidden){
            setTimeout(() => {playLoad();}, 300);
        }
    });
    estadoAtual = estados.jogar;
    user.y = Predio.y - user.altura;
    rodar();
}
//#endregion

//#region DESENHA/RENDERIZA 
function desenha(){
    //O código abaixo desenha a tela de jogo
    contex.fillStyle = "rgb(0,206,209)";
    contex.fillRect(0, 0, LARGURA, ALTURA);
    //O código abaixo desenha o chão
    chao.desenha();
    //desenha a primeira nuvem que aparece
    nuvemInit.x > -500 ? nuvemInit.desenha(): 0;

    if(estadoAtual == estados.jogando || estadoAtual == estados.perdeu){
        //desenha as nuvens
        nuvem.desenha();
        // Dsenhando e preparando os obstaculos para serem inseridos
        obstaculos.desenha();
    }
    // O código abaixo desenha o bloco que o jogador vai controlar
    user.desenha();
    //desenha o Predio com o nunho
    Predio.x > -500 ? Predio.desenha(): 0;
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
//#endregion

//#region MÉTODOS GET/SET RECORD
function setRecordMemory(record){
    localStorage.setItem("RecordMax", record);
}
function getRecordMemory(){
    var record = localStorage.getItem("RecordMax");
    return record;
}
//#endregion

main();