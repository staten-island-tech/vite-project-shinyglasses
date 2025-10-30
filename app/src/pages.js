import {getPetImage} from './misc.js'

export function saveFiles() {

}

export function mainGame(petStatus) {
    imgName = getPetImage(petStatus);
    console.log(imgName);
    html = `<div class='game'><h1>Parenthood the Game</h1><img class='pet' src='${imgName}'><button class='feed_pet'></button></div>`
    //add actual pet image later
    container = document.querySelector('.container');
    container.insertAdjacentHTML('afterbegin', html);
}
mainGame('sad');