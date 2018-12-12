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



let dogAPI = "https://dog.ceo/api/breeds/image/random";
let catAPI = "https://api.thecatapi.com/v1/images/search?mime_types=jpg,png";
let cors = "https://shielded-sea-59072.herokuapp.com/";
let catImage;
fetch(cors + catAPI, {mode: "cors"})
    .then(
        function (response) {
            // Examine the text in the response
            response.json().then(function (data) {
                catImage = data[0].url;


                //document.querySelector("body").style.background = 'url("'+data.message+'")';


            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

let images = [];
//Lien vers mon serveur heroku qui enable les cors à coup sûr

//let divs = document.querySelectorAll("div");

//Entre 18 et 25 images par ligne
let randomDivsNumber = randomIntFromInterval(25,32);
let randomSectionNumber = randomIntFromInterval(15,23);
let divs = [];
//let row = document.querySelector("section:first-child");
let row;
let div;

let indexI = randomIntFromInterval(0,randomDivsNumber-1);
let indexJ = randomIntFromInterval(0,randomSectionNumber-1);

for(let j=0;j<randomSectionNumber;j++) {
    divs[j] = [];
    row = document.createElement("section");
    document.body.appendChild(row);
    for (let i = 0; i < randomDivsNumber; i++) {
        if(i === indexI && j === indexJ){
            div = document.createElement("a");
        } else{
            div = document.createElement("div");
        }
        row.appendChild(div);
        divs[j][i] = div;
        if (j === 0) {
            fetch(cors + dogAPI, {mode: "cors"})
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
    if (images.length === randomDivsNumber) {
        alert("Quick find the cat !");
        for(let j=0; j<randomSectionNumber;j++){
            if(j !== 0){
                images = shuffle(images);
            }
            for(let i=0;i<randomDivsNumber;i++){
                divs[j][i].style.width="calc(100%/"+randomDivsNumber;
                divs[j][i].style.height ="calc(100vh/"+randomSectionNumber;
                if(i === indexI && j === indexJ){
                    divs[j][i].style.backgroundImage = 'url("'+catImage+'")';
                    divs[j][i].setAttribute("href","catfound.html?url="+catImage);
                } else{
                    divs[j][i].style.backgroundImage = 'url("'+images[i]+'")';

                }
            }
        }

    } else {
        window.setTimeout(wait, 10);
    }
}, 10);



