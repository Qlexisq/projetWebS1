//Fonction pour shuffle un array volée sur Internet comme un gros shlag
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Fonction random en JS volée comme un shlag
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
//Liens vers les API
let dogAPI = "https://dog.ceo/api/breeds/image/random";
let catAPI = "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png";
//Lien vers mon serveur Heroku qui héberge un bout de code pour allow les CORS pcq ça marchait pas juste avec mode:"cors"
let cors = "https://shielded-sea-59072.herokuapp.com/";
let catImage = "";

let readyCat = false;
//On va chercher la seule image de chat
fetch(cors + catAPI, {mode: "cors"})
    .then(
        function (response) {
            // Examine the text in the response
            response.json().then(function (data) {
                catImage = data[0].url;
                readyCat=true;
            });
        }

    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });


//Tableaux des images
let images = [];
//Entre 18 et 25 images par ligne
let randomDivsNumber = randomIntFromInterval(25,32);
//Entre 15 et 23 lignes
let randomSectionNumber = randomIntFromInterval(15,23);
//Ma collection de divs (tableaux à 2 dimensions)
let divs = [];
/*J'ai préféré définir les variables ici une seule fois plutôt que de mettre un let var = "smthg" dans le for
mais je sais pas si c'est une bonne pratique ou pas du tout
 */
let row;
let div;

//Index pour placer aléatoirement ma photo de chats dans le tableau des divs à 2 dimensions
let indexI = randomIntFromInterval(0,randomDivsNumber-1);
let indexJ = randomIntFromInterval(0,randomSectionNumber-1);

//Remplissage du tableau à 2 dimensions de div et récupération des photos de chiens
for(let j=0;j<randomSectionNumber;j++) {
    divs[j] = [];
    //Creation d'une ligne
    row = document.createElement("section");
    document.body.appendChild(row);
    for (let i = 0; i < randomDivsNumber; i++) {
        //Si c'est le moment pour mettre la photo chat, on crée un lien pour la rendre cliquable, sinon blc
        if(i === indexI && j === indexJ){
            div = document.createElement("a");
        } else{
            div = document.createElement("div");
        }
        row.appendChild(div);
        divs[j][i] = div;
        //seulement à la première itération on fetch les photos de chien pour les foutre dans un tableau
        if (j === 0) {
            fetch(cors + dogAPI, {mode: "cors"})
                .then(
                    function (response) {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            images[i] = data.message;

                        });

                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
}
//setInterval qui vérifie à voir si on a bien toutes les photos et si oui setup la mosaïque
let id = window.setInterval(function() {
    if (images.length === randomDivsNumber && readyCat) {
        alert("Quick find the cat !");
        for(let j=0; j<randomSectionNumber;j++){
            if(j !== 0){
                images = shuffle(images);
            }
            for(let i=0;i<randomDivsNumber;i++){
                //savants calculs de taille des blocs
                divs[j][i].style.width="calc(100%/"+randomDivsNumber;
                divs[j][i].style.height ="calc(100vh/"+randomSectionNumber;
                if(i === indexI && j === indexJ){
                    divs[j][i].style.backgroundImage = 'url("'+catImage+'")';
                    //on rend l'image cliquable et elle amène sur une autre page
                    divs[j][i].setAttribute("href","catFound.html?url="+catImage);
                } else{
                    divs[j][i].style.backgroundImage = 'url("'+images[i]+'")';

                }
            }
        }
        clearInterval(id);

    }
}, 10);



