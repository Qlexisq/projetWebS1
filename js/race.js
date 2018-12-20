//Liens vers l'API
let api = "https://dog.ceo/api/breeds/list/all";
//Lien vers mon serveur Heroku qui héberge un bout de code pour allow les CORS pcq ça marchait pas juste avec mode:"cors"
let cors = "https://shielded-sea-59072.herokuapp.com/";
//Tableau des races de chien
let breedlist = [];
//Nombre de races de chien
let breedNumber = 0;
//Race actuelle (utile pour dans les boucles)
let currentBreed = "";
//Contenu de la race actuelle
let currentBreedContent = "";
//Boolean qui sert pour savoir si on a bien fetch les données
let ready = false;

//fonction pour arrêter la course quand toutes les images ont atteint la fin du div
function isArrived(elt){
    return elt >= 90;
}

function raceStart(){
    //On cache le select qui permet de choisir la race
    let form = document.querySelector("form");
    form.style.display="none";
    //Enlever le listtner qui permet de commencer la course le temps de celle-ci
    let startButton = document.querySelector("#start");
    startButton.style.display="none";
    //Divs où on notera la position d'arrivée
    let rankDivs = document.querySelectorAll(".rank");
    let imgs = document.querySelectorAll("img");
    //
    let positionString, position, rand;
    let positionsArray = [];
    //Tableau des résultats pour afficher l'ordre d'arriver
    let ranking = [];
    //Initialisation
    for(let i=0;i<imgs.length;i++){
        rankDivs[i].innerHTML = "";
        imgs[i].style.left = "0%";
        positionsArray[i] = 0;
    }
    //Update de la position left toutes les 100ms
    let id = setInterval(function(){
        for(let i=0;i<imgs.length;i++){
            //On augmente de +0 à +2
            rand = randomIntFromInterval(0,2);
            positionString = imgs[i].style.left.split("%");
            position = parseInt(positionString[0]);
            position = position+rand;
            //Si l'image est arrivée, on note sa position en fonction de la longueur du tableau ranking
            if(position >= 90){
                if(ranking.indexOf(i) === -1){
                    imgs[i].style.animation="rotateBlink 0.5s ease infinite";
                    ranking.push(i);
                    console.log(imgs[i].previousSibling);
                    switch(ranking.length){
                        case 1:
                            imgs[i].previousSibling.innerHTML = "1ST";
                            break;
                        case 2:
                            imgs[i].previousSibling.innerHTML = "2ND";
                            break;
                        case 3:
                            imgs[i].previousSibling.innerHTML = "3RD";
                            break;
                        case 4:
                            imgs[i].previousSibling.innerHTML = "4TH";
                            break;
                        case 5:
                            imgs[i].previousSibling.innerHTML = "5TH";
                            break;
                    }
                }

                imgs[i].style.left = "90%";
            } else{
                imgs[i].style.left = position + "%";
            }
            positionsArray[i]=position;
        }
        //si toutes les images sont arrivées on reset
        if(positionsArray.every(isArrived)){
            setTimeout(function(){
                for(let i=0;i<imgs.length;i++){
                    imgs[i].style.left = "0";
                    imgs[i].style.animation="";
                }
                form.style.display="flex";
                startButton.setAttribute("value","GO AGAIN");
                startButton.style.display="block";
            },4000);
            clearInterval(id);
        }
    },100);
}



//Fonction random en JS volée comme un shlag
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//fonction pour fetch l'image de la race du chien choisie
function sendBreed(){
    let breed = this.value;
    let apiBreed = "https://dog.ceo/api/breed/"+breed+"/images/random";
    let img = document.querySelector(".doggo");
    img.setAttribute("src","../imgs/loader.gif");
    fetch(cors + apiBreed, {mode: "cors"})
        .then(
            function (response) {
                // Examine the text in the response
                response.json().then(function (data) {
                    img.setAttribute("src",data.message);

                    console.log(data.message);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}

//fonction pour set une image aléatoire pour les chiens concurrents
function initiateContenders(realBreedList){
    let rand;
    let ready=false;
    //tableau de toutes les images auquel on enlève la première
    let imgs = document.querySelectorAll(".contender");
    for(let i=0; i<imgs.length;i++){
        rand = randomIntFromInterval(0,breedlist.length-1);
        let breed = realBreedList[rand];
        let apiBreed = "https://dog.ceo/api/breed/"+breed+"/images/random";
        fetch(cors + apiBreed, {mode: "cors"})
            .then(
                function (response) {
                    // Examine the text in the response
                    response.json().then(function (data) {
                        imgs[i].setAttribute("src",data.message);
                        ready=true;
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
    //Pour le loader
    let id = setInterval(function(){
        if(ready){
            let loader = document.querySelector("#loader");
            let cover = document.querySelector("#cover");
            loader.style.display="none";
            cover.style.display="block";
            clearInterval(id);
        }
    },10);

}



fetch(cors + api, {mode: "cors"})
    .then(
        function (response) {
            // Examine the text in the response
            response.json().then(function (data) {
                //Nombre de races qu'on récupère de l'objet
                breedNumber = Object.keys(data.message).length;
                for(let i=0;i<breedNumber;i++){
                    /*data.message est un objet dont les noms des propriétés sont ceux des races
                    * les propriétés contienent un tableau :
                    * vide quand il n'y a pas de sous-race
                    * rempli avec le nom des sous-races quand il y en a
                    * currentBreed = nom de la race
                    * currentBreedContent = tableau des sous-races
                    * */
                    currentBreedContent = data.message[Object.keys(data.message)[i]];
                    currentBreed = Object.keys(data.message)[i];
                    /*s'il y a des sous-races on stock dans le tableau des races à l'index
                    * i un sous tableau contenant le nom de la race à l'indice 0 et celui des sous-races après
                    */
                    if(currentBreedContent.length>0){
                        breedlist[i] = [];
                        breedlist[i][0] = currentBreed;
                        let compteur = 0;
                        for(let j=1; j<=currentBreedContent.length;j++){
                             breedlist[i][j] = currentBreedContent[compteur];
                            compteur++;
                        }
                        compteur = 0;
                    } else{
                        breedlist[i] = currentBreed;
                    }
                }
                //une fois qu'on a les data c'est bon
                ready = true;
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

//setInterval pour vérifier toutes les 10ms si on a reçu les data
let id = window.setInterval(function() {
    if (ready) {
        let realBreedList = [];
        let select = document.querySelector("#choice");
        let option, text;
        //on crée un noeud texte avec le nom de la race et on l'append à l'option qu'on append au select
        for(let i=0;i<breedlist.length;i++){
            //si on a un tableau alors il y a des sous-races donc traitement différent dans l'affichage
            if(typeof(breedlist[i]) === "object"){
                for(let j=1;j<breedlist[i].length;j++){
                    realBreedList.push(breedlist[i][0]+"-"+breedlist[i][j]);
                    option = document.createElement("option");
                    text = document.createTextNode(breedlist[i][0]+"-"+breedlist[i][j]);
                    option.appendChild(text);
                    select.appendChild(option);
                }
            } else{
                realBreedList.push(breedlist[i]);
                option = document.createElement("option");
                text = document.createTextNode(breedlist[i]);
                option.appendChild(text);
                select.appendChild(option);
            }


        }
        clearInterval(id);
        select.addEventListener("change",sendBreed);
        initiateContenders(realBreedList);
        let startButton = document.querySelector("#start");
        startButton.addEventListener("click", raceStart);
    }
}, 10);

