import './style.css'
const notifications = [{'name': 'hunger'
}];
import { showThemes} from './themes';
import {Pet} from './pets'

class SaveFiles {
    static createSaveFile(name, pet) {
        const savefiles = document.querySelector('#savefiles');
        savefiles.innerHTML = `<div class='savefile'> <p>Name: ${name}, pets: ${pet}</p>, 
        </div>`
        const userProfile = { 'name': name, 'pets': [pet], 'theme': 'light'};
        console.log(userProfile)
        localStorage.setItem('userProfile', JSON.stringify(userProfile)); 
    }
    static changeSaveFile() {

    }

 accessSaveFile() {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
        const userProfile = JSON.parse(storedUserProfile);
        console.log(userProfile.name);
    }
}}

function checkCollision(rect1, rect2) {
  
  if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {

    console.log('true')
    return true;
  }
  return false;
}

function shop() {
    const btn = document.querySelector('.nav__shop');
    btn.addEventListener('click', function() {
        const container = document.querySelector('.game');
        container.insertAdjacentHTML('afterbegin', 
            `<div class='shop'>
                <div class='shop__top'>
                    <h2>Shop </h2> 
                    <button class='leave'>X</button> 
                </div>
              <div class='shop__items'> 
              <button class='shop__item'>Cat</button>
              <button class='shop__item'>Dog</button>
              <button class='shop__item'>Bunny</button>
              </div>
              </div>`)
              //happy doggy = money
    })
}

function notification(notifications) {
    let notifsString = ``
    
    const container = document.querySelector('body')
    const notifsContainer = document.querySelector('.notifications')
    notifsContainer.insertAdjacentHTML('afterbegin', 
        `<li></li>`
    )

    let html = `<div class='notification'>
                <h2>Notifications</h2>
                <ul class='notifications'>
                </ul>
                </div>`
    container.insertAdjacentHTML('afterbegin',
        html
    )
}


const pet = new Pet('johnny');
pet.showPet();
pet.increasePetHunger();
pet.decreasePetHunger();
pet.decreasePetHealth();
pet.getRandomFoodPosition();
shop();
showThemes();