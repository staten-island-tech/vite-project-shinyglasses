
export function saveFiles() {

}

export function mainGame() {
    html = `<div class='game'><h1>Game</h1><img class='pet' src=''><button class='feed_pet'></button></div>`
    //add actual pet image later
    container = document.querySelector('.container');
    container.insertAdjacentHTML('afterbegin', html);
    console.log('sfuhdauhdk')
}
mainGame();