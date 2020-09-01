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

function Sprite02(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.desenha = function(xCanvas, yCanvas,obsAltura){
        contex.drawImage(obsImage,this.x,this.y,this.largura,obsAltura,xCanvas, yCanvas,this.largura,obsAltura);
    }
}
obsImage01 = new Sprite02(0,0,50);
obsImage02 = new Sprite02(50,0,50);
obsImage03 = new Sprite02(100,0,50);
obsImage04 = new Sprite02(150,0,50);
obsImage05 = new Sprite02(200,0,50);