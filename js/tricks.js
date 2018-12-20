let img=document.querySelector("img");
let previous=""
function doTrick(){
    let trick = this.value;
    switch(trick){
        case "360":
            img.style.animation="rotate 1s linear 1";
            break;
        case "360 backwards":
            img.style.animation="rotateBack 1s linear 1"
            break;
        case "Grow":
            img.style.animation="grow 1s linear 1";
            break;
        case "Shrink":
            img.style.animation="shrink 1s linear 1";
            break;
        case "Left slide":
            img.style.animation="leftSlide 1s ease-in 1";
            break;
        case "Right slide":
            img.style.animation="rightSlide 1s ease-in 1";
            break;
        case "Jump":
            img.style.animation="jump 1s linear 1";
            break;
        case "Distort":
            img.style.animation="distort 1s linear 1";
            break;
        case "Jump360":
            img.style.animation="jump360 1.5s linear 1";
            break;
        case "Jump Double 360 front back glide right":
            img.style.animation="jumpDouble360leftBack 2s linear 1";
            break;
    }
}
let select = document.querySelector("select");
select.addEventListener("change",doTrick);