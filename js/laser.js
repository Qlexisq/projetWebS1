//Fonction random en JS volée comme un shlag

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
let i = 0;
let txt = "You finally grab the laser but nothing happens. You're a dog, not a cat !! You back off the computer slowly as you start questioning your existence as a dog";
let speed = 50;

function typeWriter() {
    if (i < txt.length) {
        document.body.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
function congrats(){
    document.querySelector("#container").style.display="none";
    typeWriter();
}
//merveilleux tableau d'insultes qui servira au petit point rouge
let insultArray = ["u suck", "ahaha u so bad", "too easy", "noob", "dumbass", "give up already", "boring"];

//x = css left et y = css top
let x;
let y;
let laser = document.querySelector("#container");
laser.style.top = "0px";
laser.style.left = "0px";

//position actuelle du laser
let positionY;
let positionX;
//
let odd;
//Définition du cadre de sécurité pour éviter que le laser sorte de l'écran
let positiveBorderX = window.innerWidth/2 - 100;
let negativeBorderX = -1*(window.innerWidth/2 - 100);
let positiveBorderY = window.innerHeight/2 - 100;
let negativeBorderY = -1*(window.innerHeight/2 - 100);

//si tu arrives à cliquer ça déclenche la super fonction
laser.addEventListener("click", congrats);
//fonction pour bouger le laser toutes les 300ms
setInterval(function(){
    //pourcentage de chances d'un gros jump
    odd = randomIntFromInterval(1,10);

    //manipulation un peu hasardeuse pour chopper la position actuelle du truc
    positionY = laser.style.top.split("p");
    positionX = laser.style.left.split("p");
    positionY = parseInt(positionY[0]);
    positionX = parseInt(positionX[0]);
    //si le laser est dans le cadre définit plus haut, tout va bien, il y a 3/10 chances qu'il fasse un bond de +- 100px
    if(positionX < positiveBorderX && positionX > negativeBorderX && positionY < positiveBorderY && positionY > negativeBorderY){
        if(odd <= 8){
            x = randomIntFromInterval(-100,100) + positionX;
            y = randomIntFromInterval(-100,100) + positionY;
        } else{
            x = randomIntFromInterval(-10,10) + positionX;
            y = randomIntFromInterval(-10,10) + positionY;
        }
    } else{
        /*si le laser est dans le bord gauche de l'écran ou dans le bord droit
        on rectifie le tir en faisant un gros jump inverse sinon comportement normal
         */
        if(positionX < negativeBorderX){
            x = randomIntFromInterval(100,200) + positionX;
        } else if (positionX > positiveBorderX){
            x = randomIntFromInterval(-200,-100) + positionX;
        } else{
            if(odd <= 8){
                x = randomIntFromInterval(-100,100) + positionX;
            } else{
                x = randomIntFromInterval(-10,10) + positionX;
            }
        }
        /*si le laser est dans le bord haut de l'écran ou dans le bord bas
        on rectifie le tir en faisant un gros jump inverse sinon comportement normal
         */
        if(positionY < negativeBorderY){
            y = randomIntFromInterval(100,200) + positionY;
        } else if (positionY > positiveBorderY){
            y = randomIntFromInterval(-200,-100) + positionY;
        } else{
            if(odd <= 8){
                y = randomIntFromInterval(-100,100) + positionY;
            } else{
                y = randomIntFromInterval(-10,10) + positionY;
            }
        }

    }
    //une fois les nouvelles positions définies on les updates
    laser.style.top = y+"px";
    laser.style.left = x+"px";


},300);
//le troll
let rand = 0;
let text = document.querySelector("span");
setInterval(function(){
    rand = randomIntFromInterval(0,6);
    text.innerHTML = insultArray[rand];
},2000);