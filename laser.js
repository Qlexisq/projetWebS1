function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function congrats(){
    alert("Damn you strong");
}

let insultArray = ["u suck", "ahaha u so bad", "too easy", "noob", "dumbass", "give up already", "boring"];

let x;
let y;
let laser = document.querySelector("#container");
laser.style.top = "0px";
laser.style.left = "0px";
let positionY;
let positionX;
let odd;
let positiveBorderX, negativeBorderX, positiveBorderY, negativeBorderY;

laser.addEventListener("click", congrats);
setInterval(function(){
    positiveBorderX = window.innerWidth/2 - 100;
    negativeBorderX = -1*(window.innerWidth/2 - 100);

    positiveBorderY = window.innerHeight/2 - 100;
    negativeBorderY = -1*(window.innerHeight/2 - 100);

    odd = randomIntFromInterval(1,10);

    positionY = laser.style.top.split("p");
    positionX = laser.style.left.split("p");
    positionY = parseInt(positionY[0]);
    positionX = parseInt(positionX[0]);
    console.log(positionX);
    if(positionX < positiveBorderX && positionX > negativeBorderX && positionY < positiveBorderY && positionY > negativeBorderY){
        if(odd <= 8){
            x = randomIntFromInterval(-100,100) + positionX;
            y = randomIntFromInterval(-100,100) + positionY;
        } else{
            x = randomIntFromInterval(-10,10) + positionX;
            y = randomIntFromInterval(-10,10) + positionY;
        }
    } else{
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


    laser.style.top = y+"px";
    laser.style.left = x+"px";


},300);
let rand = 0;
let text = document.querySelector("span");
setInterval(function(){
    rand = randomIntFromInterval(0,6);
    text.innerHTML = insultArray[rand];
},2000);