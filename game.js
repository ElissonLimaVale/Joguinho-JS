var canvas, contex, ALTURA, ALTURA, frames = 0,tempoParada = 0,
        maxPulos = 4,velocidade = 6,dificuldade, velocidaDificuldade = 1,
        estadoAtual, record = 0,
        estados = {
            jogar: 0,
            jogando: 1,
            perdeu: 2
        },
         // esse é um tipo de variavel que pode ter varios valores e pode também ter funções, como se fosse uma classe.
         chao = { 
            y: 450,
            altura: 50,
            cor: "rgb(56, 60, 61)",
            // desenha a tela principal do jogo
            desenha: function(){
                contex.fillStyle = this.cor;
                contex.fillRect(0, this.y, LARGURA, this.altura);
            }
        },
        user = {
            x: 50,
            y: 0,
            altura: 50,
            largura: 50,
            cor: "rgb(254, 150, 3)",
            gravidade: 1.3,
            velocidade: 0,
            forcaDoPulo: 20,
            contPulos: 0,
            //faz com que o bloco caia, atualizando a pocição no eixo Y
            // almentando a distancia em cada chamada da função, cimulando uma gravidade.
            atualiza: function(){
                this.velocidade += this.gravidade;
                this.y += this.velocidade;
                // O código abaixo faz com que o bloco pare de cair, travando o vaor do eixo y 
                if(this.y > chao.y - this.altura){
                    this.y = chao.y - this.altura;
                    this.velocidade = 0;
                    this.contPulos = 0;
                }
            },

            // inverte a velocidade para um valor negativo
            // assim, em vêz de descer o bloco vai subir, depois cair
            // fazendo com que ele pule.
            pula: function(){
                if(this.contPulos < maxPulos){
                    this.velocidade = - this.forcaDoPulo;
                    this.contPulos++;
                }
            },
            //desenha o bloco que o jogador vai controlar
            desenha: function(){
                userImage.desenha(this.x,this.y);
            }
        },
        obstaculos = {
            _obs: [],
            cores: ["1", "2", "3", "4", "5"],
            tempoInsere:  0,
            score: 0,

            // A função insere vai inserir no array "_obs" os atributos dos objetos que ja estão sendo desenhados
            //atravéz da função "desenha". Ao inserir os atributos no array, automaticamente eles serão renderizados
            insere: function(){
                this._obs.push({ //inserindo os obstaculos no array "_obs"
                    x: LARGURA,
                    largura: 40, // gera uma largura aleatória probloco entre 30 e 50
                    altura: 30 + Math.floor(120 * Math.random()), // gera uma altura aleatoria entre 30 e 120 px
                    cor: this.cores[Math.floor(5 * Math.random() + 1)]
                });
                if(velocidade > 7){
                    this.tempoInsere = 45;
                }
                if(velocidade > 9){
                    this.tempoInsere = 40;
                }
                if(velocidade > 10){
                    this.tempoInsere = 35;
                }
                if(velocidade > 11){
                    this.tempoInsere = 30;
                }else{
                    this.tempoInsere = 50;
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
                    // decrementando o eixo x com o valor da velocidade
                    obs.x -= velocidade;
                    // verifica se o bloco do jogador colidiu com o obstaculo
                    if(user.x + user.largura > obs.x && obs.x - obs.largura < user.x + user.largura &&
                        obs.x > user.x - user.largura && user.y + user.altura > chao.y - obs.altura){
                      // se colidiu altera o estado atual para "perdeu", e chaa a função reset para zerar o jogo
                            velocidade = 0;
                            user.velocidade = 0;// pausa o bloco do usuario
                            user.gravidade = 0;
                            estadoAtual = estados.perdeu;
                            if(obstaculos.score > record){
                                localStorage.setItem("record", this.score);
                                record = localStorage.getItem("record");
                                setRecord(record);
                                eventRecord();
                            }else{
                                gameOver();
                            }
                    }
                    //verificando se o objeto ja passou da tela, para apagá-lo do arry, assim evitando
                    // que ele continue decrementando e isso consuma processamento!
                    else if(obs.x <= -obs.largura){

                        this.score++;   // almenta o score/pontuação pois o obstaculo passou sem colidir
                        this._obs.splice(i, 1);
                        tam--; // após apagar o objeto do array, é importante decrementar as variaveis do for
                        i--;  // para assim evitar erro no caso de dois ou mais objetos
                    }
                }
            },
            reset: function(){ // limpa os as variaveis para o valor padrão após o jogador perder, para que o jogo começe zerado de novo
                velocidade = 6;
                frames = 0;
                velocidaDificuldade = 1;
                tempoParada = 0;
                user.gravidade = 1.3;
                this.score = 0;
            },
            // o método desenha do obstáculo está sempre em execução junto com o metodo atualiza
            // para que assim que o objeto for adicionado no array ele aparêça na tela.
            desenha: function(){
                for(var i = 0, tam = this._obs.length; i < tam; i++){
                    var obs = this._obs[i];
                    if(obs.cor == "1"){
                        obsImage01.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }else if(obs.cor == "2"){
                        obsImage02.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }else if(obs.cor == "3"){
                        obsImage03.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }else if(obs.cor == "4"){
                        obsImage04.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }else if(obs.cor == "5"){
                        obsImage05.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }else{
                        obsImage01.desenha(obs.x,chao.y - obs.altura,obs.altura);
                    }
                }
            }
        };
        if(localStorage.getItem("record") != null){
            record = localStorage.getItem("record");
        }
        //funçã pular
        function pular(){// verifica a variavel estado e só executa a função pular se o estado estiver "estados.jogando"
            if(estadoAtual == estados.jogando){
                user.pula();
            }
            else if(estadoAtual == estados.jogar){// se o estado estiver como jogar muda o estado para jogando, oque
                estadoAtual = estados.jogando     // faz o jogo inicia!
            }
        }
        function main(){
            
            ALTURA = window.innerHeight; //captura a altura da tela do usuario
            LARGURA = window.innerWidth; //captura a argura da tela
            // adapta a tela para 500x600 caso a tela do usuario seja grande o suficiente
            // se não, vai apenas tomar o tamanho total da tela
            if (LARGURA >= 800 ){
                ALTURA = 500;
                LARGURA = 800;
            }
            // criando a tela
            canvas = document.createElement("canvas");
            canvas.width = LARGURA;
            canvas.height = ALTURA;
            canvas.style.border = "5px solid rgb(0,0,0)";
            imageUser = new Image();
            imageUser.src = "imagens/user.png";
            obsImage = new Image();
            obsImage.src="imagens/obsTodos.png";

            contex = canvas.getContext("2d");
            //adicionando o objeto tela no body/corpo da pagina
            document.body.appendChild(canvas);

            document.onkeypress = verifica;// captura se alguma tecla foi digitada, se sim chama a função verifica

            function verifica(){
               var teste = window.event.keyCode; // Captura o codigo da tecla, usaremos a tecla espaço que é 32
               if(teste == 32){  //verifica se foi clicado na tecla de espaço para "pular"
                   pular(); // se a tecla apertada for a tecla de espaço, chama a função "pular()"
               }
            }
            // Chama o método pular quando é detectado o evento "mousedown" que é quando o jogador clica com o mouse
            document.addEventListener("mousedown", pular);
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
                // o código abaixo captura o frame e usa para almenta a dificuldade de acordo com o valor do frame
                dificuldade = frames;
                // almenta a velocidade em 0.2 sempre que o frames incrementar 250.
                if(dificuldade / 250 == velocidaDificuldade){
                    velocidaDificuldade++;
                    velocidade += 0.2;
                    console.log("velocidade: " + velocidade);
                }
                
            }
            if(estadoAtual == estados.jogar){
                obstaculos.reset();
            }
            //chamando o calculo de gravidade, que vai atualizar a posiçã dele no eixo Y
            user.atualiza();
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

            if(estadoAtual == estados.jogar){
            contex.fillStyle = "#00bc2f";
            contex.font = "40px game_over";
            contex.fillText("CLIQUE PARA INICIAR!", 90, (ALTURA / 2) - 20);
            }
            frames = 0;
            
            //O código abaixo desenha o chão
            chao.desenha();
             if(estadoAtual == estados.jogando || estadoAtual == estados.perdeu){
                // Dsenhando e preparando os obstaculos para serem inseridos
                obstaculos.desenha();
             }
             // O código abaixo desenha o bloco que o jogador vai controlar
             user.desenha();
        }
        main();// Inicializa o jogo
        // processamento do audio do jogo.
        function reproduz(){
            const audio = document.querySelector('audio');
            audio.play();
            }   
        function pausar(){
            const audio = querySelector('audio');
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
        }
        function setRecord(recorde){
            for(i = 1; i <= 10; i++){
                id = "r0" + i;
                document.getElementById(id).innerHTML = recorde;
            }
        }
        function eventRecord(){
            document.getElementById("recordBody").style = "top: 20px;";
            for(i = 1; i <= 10; i++){
                console.log("solicitação: " + i);
                id = "r0" + i;
                var tempo = Math.floor(5 * Math.random() + 1);
                document.getElementById(id).style = "animation: chuva " + tempo + "s linear;";
            }
        }