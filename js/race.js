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

function raceStart(){
    let img=document.querySelectorAll(".contender")[0];
    console.log(img);
    let style=img.style.left = "0%";
    console.log(style);
    let leftString;
    let left;
    let id = setInterval(function(){
        leftString = img.style.left.split("%");
        left = parseInt(leftString[0]);
        left = left+1;
        img.style.left = left + "%";
        if(left === 90){
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
    let imgs = document.querySelectorAll(".doggo");
    fetch(cors + apiBreed, {mode: "cors"})
        .then(
            function (response) {
                // Examine the text in the response
                response.json().then(function (data) {
                    for(let i=0;i<imgs.length;i++){
                        imgs[i].setAttribute("src",data.message);
                    }
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
    //tableau de toutes les images auquel on enlève la première
    let imgs = document.querySelectorAll(".contender");
    for(let i=0; i<4;i++){
        rand = randomIntFromInterval(0,breedlist.length-1);
        let breed = realBreedList[rand];
        let apiBreed = "https://dog.ceo/api/breed/"+breed+"/images/random";
        fetch(cors + apiBreed, {mode: "cors"})
            .then(
                function (response) {
                    // Examine the text in the response
                    response.json().then(function (data) {
                        imgs[i].setAttribute("src",data.message);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
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

