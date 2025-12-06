import { initExitPopup, preventMultiplePopups,changeSelectedButtonCSS } from "./misc";
import {Pet} from './pets'
export function changeTheme(btns) {
        btns.forEach(btn => btn.addEventListener('click', function(event) {
        const theme = event.target.textContent.toLowerCase();
        document.body.classList.forEach(cssClass => document.body.classList.remove(cssClass))
        document.body.classList.add(theme); 
        changeSelectedButtonCSS(btns, btn);
    }))
}
export function showThemesPopup() {
    const btn = document.querySelector('.nav__themes')
    btn.addEventListener('click', function() {
        const container = document.querySelector('.pets');
        const popupHTML = `<div class='themes popup'</div>
        <div class='themes__top'> 
            <h2>Themes</h2> <button class='leave'>X</button>
        </div> 
        <div class="theme__options"> 
        <button class="theme">Light</button>
        <button class="theme">Dark</button>
        <button class="theme">Strawberry</button>
        <button class="theme">Peaches</button>
      </div>
      </div>`
      preventMultiplePopups(popupHTML, container);
    const btns = document.querySelectorAll('.theme');
    changeTheme(btns);
    initExitPopup();
    })
}

export function shop() {
        const btn = document.querySelector('.nav__shop');
        btn.addEventListener('click', function() {
            let type = '' 
            const container = document.querySelector('.pets');
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
            const btns = document.querySelectorAll('.shop__item');
            console.log(btns);
            btns.forEach(btn => btn.addEventListener('click', function(event){
                    type = event.target.textContent.toLowerCase();
                    console.log(type);
                    changeSelectedButtonCSS(btns, btn);
            }))
            const buyBtn = document.querySelector('.buy');
            buyBtn.addEventListener('click', function() {
                const inputElement = document.getElementById('name');
                const inputValue = inputElement.value;
                console.log(inputValue);
                console.log(type)
                const pet = new Pet(inputValue, type)
                pet.setUpPet();  
                console.log(document.querySelector('.pet'));
            })
        })
        
}

export class SaveFiles {
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
    static accessSaveFile() {
        const storedUserProfile = localStorage.getItem('userProfile');
        if (storedUserProfile) {
            const userProfile = JSON.parse(storedUserProfile);
            console.log(userProfile.name);
    }}
    static showSaveFilesPopUp() {
        const btn = document.querySelector('.nav__saves');
        const container = document.querySelector('.pets')
        btn.addEventListener('click', function() {
            const popupHTML = `<div class='savefiles popup'>
                    <div class='savefiles__top'>
                        <h2>Saves</h2> 
                        <button class='leave'>X</button> 
                    </div>
                <div class='savefiles__list'> 
                    <div class='savefiles__slot'>
                    <button class='savefile'>Save 1</button> 
                    <button class='rename'>Rename</button>
                    </div>
                    <div class='savefiles__slot'>
                    <button class='savefile'>Save 2
                    <button class='rename'>Rename</button>
                    </button> 
                    </div>
                    <div class='savefiles__slot'>
                    <button class='savefile'>Save 3</button> <button class='rename'>Rename</button> 
                    </div>
                </div>
                </div>`
            preventMultiplePopups(popupHTML, container);
            initExitPopup();
        })
    }
}
