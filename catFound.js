let url = window.location.href;
let tab = url.split("=");
let catImage = tab[1];

document.querySelector("img").setAttribute("src",catImage);

