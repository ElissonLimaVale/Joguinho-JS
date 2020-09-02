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

function Sprite02(x, y, largura){
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
obsImage005 = new Sprite03(0,270,50);
obsImage004 = new Sprite03(50,270,50);
obsImage003 = new Sprite03(100,270,50);
obsImage002 = new Sprite03(150,270,50);
obsImage001 = new Sprite03(200,270,50);
function setRecordMemory(record){
    localStorage.setItem("RecordMax", record);
}
function getRecordMemory(){
    var record = localStorage.getItem("RecordMax", obstaculos.score);
    return record;
}
