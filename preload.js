var cont = 0, texto;
        function load(){
            switch(cont){
                case 0:
                    texto = "CARREGANDO";
                    cont = 1;
                    break;
                case 1:
                    texto = "CARREGANDO.";
                    cont = 2;
                    break;
                case 2:
                    texto = "CARREGANDO..";
                    cont = 3;
                    break;
                case 3:
                    texto = "CARREGANDO...";
                    cont = 0;
                    break;
            }
        }
        
        setInterval(() => {
            if(document.getElementById("preload").hidden){
                return;
            }
            load();
            document.getElementById("h1-preload").innerText = texto;
        }, 250);

        setTimeout(() => {
            document.getElementById("preload").style = "transition: .5s; opacity: 0;";
            setTimeout(() => {
                document.getElementById("preload").hidden = true;
            }, 1000);
        }, 1800);
        
        
        