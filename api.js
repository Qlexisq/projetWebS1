/* --------- SK8 IPSUM ------ */
/*for(let i=0;i<data.length;i++){
    document.querySelector("p").innerHTML += data[i];
}*/

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

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


let api = "https://dog.ceo/api/breeds/image/random";
let images = [];
//Lien vers mon serveur heroku qui enable les cors à coup sûr
let cors = "https://shielded-sea-59072.herokuapp.com/";
//let divs = document.querySelectorAll("div");

let divs = [][];
let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

//Entre 18 et 25 images par ligne
let randomDivsNumber = randomIntFromInterval(18,25);
let randomSectionNumber = randomIntFromInterval(7,10);
//let row = document.querySelector("section:first-child");
let row;
let div;
for(let j=0;j<randomSectionNumber;j++) {
    row = document.createElement("section");
    document.body.appendChild(row);
    for (let i = 0; i < randomDivsNumber; i++) {
        div = document.createElement("div");
        row.appendChild(div);
        divs[j][i] = div;
        if (j == 0) {
            fetch(cors + api, {mode: "cors"})
                .then(
                    function (response) {
                        // Examine the text in the response
                        response.json().then(function (data) {
                            images[i] = data.message;

                            //console.log(data);
                            //document.querySelector("body").style.background = 'url("'+data.message+'")';


                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
}

window.setTimeout(function wait () {
    if (images.length == randomDivsNumber) {

        for(let i=0;i<randomDivsNumber;i++){
            divs[i].style.width="calc(100%/"+randomDivsNumber;
            divs[i].style.backgroundImage = 'url("'+images[i]+'")';
        }
    } else {
        window.setTimeout(wait, 10);
    }
}, 10);



