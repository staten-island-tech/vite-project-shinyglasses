import './style.css'
const notifications = [{'name': 'hunger'
}];
import { showThemes} from './themes.js';
import {Pet} from './pets.js'
import { initExitPopup, preventMultiplePopups } from './misc.js';

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



function shop() {
    const btn = document.querySelector('.nav__shop');
    btn.addEventListener('click', function() {
        const container = document.querySelector('.game');
        const popupHTML = `<div class='shop popup'>
                <div class='shop__top'>
                    <h2>Shop </h2> 
                    <button class='leave'>X</button> 
                </div>
            <form>
                <label for="comments">Pet Name</label>
                 <input type="text" id="name" name="name" placeholder='Enter pet name   '>
            </form>
              <div class='shop__items'> 
              <button class='shop__item'>Cat</button>
              <button class='shop__item'>Dog</button>
              <button class='shop__item'>Bunny</button>
              <button class='buy' type='submit'>Buy Pet</button>
              </div>
              
              </div>`
        preventMultiplePopups(popupHTML, container);
        initExitPopup();
        const buyBtn = document.querySelector('.buy');
        buyBtn.addEventListener('click', function() {
            const inputElement = document.getElementById('name');
            const inputValue = inputElement.value;
            console.log(inputValue)
        })
        const btns = document.querySelectorAll('.shop__item');
        console.log(btns);
        btns.forEach(btn => btn.addEventListener('click', function(event){
                const type = event.target.textContent.toLowerCase();
                console.log(type);
            })
        )
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


const pet = new Pet('johnny', 'cat');
pet.showPet();
pet.increasePetHunger();
pet.decreasePetHunger();
pet.decreasePetHealth();
pet.getRandomFoodPosition();
shop();
showThemes();
