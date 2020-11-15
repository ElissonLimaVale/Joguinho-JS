//#region SPRITE JOGADOR
function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.desenha = function(xCanvas, yCanvas){
        contex.drawImage(imageUser,this.x,this.y,this.largura,this.altura,xCanvas, yCanvas,this.largura,this.altura);
    }
}
userImage = new Sprite(0,0,50,50);
//#endregion

//#region SPRITES OBSTACULOS DE BAIXO
function Sprite02(x, y, largura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.desenha = function(xCanvas, yCanvas,obsAltura){
        contex.drawImage(obsImage,this.x,this.y,this.largura,obsAltura,xCanvas, yCanvas,this.largura,obsAltura);
    }
}
//para pc
obsImage01 = new Sprite02(0,0,84);
obsImage02 = new Sprite02(84,0,84);
obsImage03 = new Sprite02(168,0,84);
obsImage04 = new Sprite02(252,0,84);
obsImage05 = new Sprite02(336,0,84);
// para celualr
obsImage01cel = new Sprite02(0,0,50);
obsImage02cel = new Sprite02(50,0,50);
obsImage03cel = new Sprite02(100,0,50);
obsImage04cel = new Sprite02(150,0,50);
obsImage05cel = new Sprite02(200,0,50);
//#endregion

//#region SPRITES OBSTACULOS DE CIMA
function Sprite03(x, y, largura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.desenha = function(xCanvas, yCanvas,obsAltura){
        var alt = obsAltura - this.y;
        alt = alt * (-1);
        contex.drawImage(obsImageCima,this.x,alt,this.largura,obsAltura,xCanvas, yCanvas,this.largura,obsAltura);
    }
}
// Para pc
obsImage005 = new Sprite03(0,300,84);
obsImage004 = new Sprite03(84,300,84);
obsImage003 = new Sprite03(168,300,84);
obsImage002 = new Sprite03(252,300,84);
obsImage001 = new Sprite03(336,300,84);
//para celular
obsImage005cel = new Sprite03(0,300,50);
obsImage004cel = new Sprite03(50,300,50);
obsImage003cel = new Sprite03(100,300,50);
obsImage002cel = new Sprite03(150,300,50);
obsImage001cel = new Sprite03(200,300,50);
//#endregion

//#region  SPRITE PRÉDIO COM O NINHO
function Sprite04(x, y, largura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.desenha = function(xCanvas, yCanvas,obsAltura){
        var alt = obsAltura - this.y;
        alt = alt * (-1);
        contex.drawImage(obsPredioNinho,this.x,alt,this.largura,obsAltura,xCanvas, yCanvas,this.largura,obsAltura);
    }
}
obsPredio = new Sprite04(0,340,162);
//#endregion

//#region SPRITE DAS NUVENS
function Sprite05(x, y, largura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.desenha = function(xCanvas, yCanvas,obsAltura){
    
        contex.drawImage(nuvemImage,this.x,this.y,this.largura,obsAltura,xCanvas, yCanvas,this.largura,obsAltura);
    }
}
nuvem1 = new Sprite05(0,0,320);
nuvem2 = new Sprite05(320,0,320);
nuvem3 = new Sprite05(640,0,320);
//#endregion