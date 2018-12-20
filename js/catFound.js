let i = 1;
function destruction(){
    if(i>0){
        this.style.opacity = i;
        this.style.animation = "shake 0.1s linear infinite";
        i = i - 0.01;
    } else{
        this.style.display="none";
        document.querySelector("p").innerHTML = "GOOD, MISSION ACCOMPLISHED";
    }
    console.log(i);

}

//on récupère l'url de l'image qui a été passée en paramètre
let url = window.location.href;
let tab = url.split("=");
let catImage = tab[1];
//destruction compteur

let img = document.querySelector("img");
img.setAttribute("src",catImage);
img.addEventListener("click",destruction);


