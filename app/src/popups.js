import {initExitPopup,preventMultiplePopups,changeSelectedButtonCSS} from "./misc";
import { Pet } from "./pets";

const inventory = [];
console.log("POPUP STORAGE", window.localStorage === localStorage);

export function changeTheme(btns) {
  btns.forEach((btn) =>
    btn.addEventListener("click", function (event) {
      const theme = event.target.textContent.toLowerCase();
      document.body.classList.forEach((cssClass) =>
        document.body.classList.remove(cssClass)
      );
      document.body.classList.add(theme);
      changeSelectedButtonCSS(btns, btn);
    })
  );
}
export function showThemesPopup() {
  const btn = document.querySelector(".nav__themes");
  btn.addEventListener("click", function () {
    const container = document.querySelector(".pets");
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
      </div>`;
    preventMultiplePopups(popupHTML, container);
    const btns = document.querySelectorAll(".theme");
    changeTheme(btns);
    initExitPopup();
  });
}

export function shop() {
  const btn = document.querySelector(".nav__shop");
  btn.addEventListener("click", function () {
    let type = "";
    const container = document.querySelector(".pets");
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
                
                </div>`;
    preventMultiplePopups(popupHTML, container);
    initExitPopup();
    const btns = document.querySelectorAll(".shop__item");
    btns.forEach((btn) =>
      btn.addEventListener("click", function (event) {
        type = event.target.textContent.toLowerCase();
        console.log(type);
        changeSelectedButtonCSS(btns, btn);
      })
    );
    const buyBtn = document.querySelector(".buy");
    buyBtn.addEventListener("click", function () {
      const inputElement = document.getElementById("name");
      const inputValue = inputElement.value;
      const pet = new Pet(inputValue, type);
      inventory.push(pet);
      console.log(inventory)
      console.log(localStorage) 
      pet.setUpPet();
    });
  });
}

export class Savefiles {
static createSavefile(inventory, theme, name, active) {
const userProfile = { 
  'name': name, 
  'inventory': inventory,
  'theme': theme, 
  'active': active,

};
localStorage.setItem(`save__${name}`, JSON.stringify(userProfile));
}
static updateSavefile() {
  setInterval(function() {
            
            }   
            , 5000); 
}
static switchSavefile() {
    const btns = document.querySelectorAll('.savefile__select');
    Savefiles.highlightSelectedSave();  
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            const slot = btn.closest('.savefiles__slot');
            const name = slot.getAttribute('data-title');
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const save = JSON.parse(localStorage.getItem(key));
                save.active = (save.name === name);
                console.log(save.active)
                localStorage.setItem(key, JSON.stringify(save));
                console.log(localStorage)
            }
            
            //changing the css of the selected slot
            const element = this;
            const container = element.closest('.savefiles__list');
            const slots = container.querySelectorAll('.savefiles__slot');

            slots.forEach(slot => {
              let heading = slot.querySelector('h3');
              slot.style.backgroundColor = 'var(--button)';
              heading.style.backgroundColor ='var(--button)';
            });
  
            let selectedSlot = element.closest('.savefiles__slot');
            let selectedHeading = selectedSlot.querySelector('h3');
            selectedSlot.style.backgroundColor = 'var(--selected-button)';
            selectedHeading.style.backgroundColor = 'var(--selected-button)';
        });
    });
}
static loadSavefile(name) {
  const savefile = JSON.parse(localStorage.getItem(`save__${name}`));
  return savefile
}
static highlightSelectedSave() {
  for (let i = 0; i < localStorage.length; i++) {
      let num = 0
      if (i === 0) {
        num = 'one'
      } else if (i === 1) {
        num = 'two'
      } else {
        num = 'three'
      }
      let tempSave = localStorage.getItem(`save__${num}`);
      
      let save = JSON.parse(tempSave);
      if (save.active) {
        console.log(save.name)
        const slot = document.querySelector(`[data-title='${save.name}']`);
        const heading = slot.querySelector('h3')
        slot.style.backgroundColor = 'var(--selected-button)'
        heading.style.backgroundColor = 'var(--selected-button)'
        console.log(slot)
      }
      
    }
}
static showSaveFilesPopUp() {
const btn = document.querySelector(".nav__saves");
const container = document.querySelector(".pets");
btn.addEventListener("click", function () {
const popupHTML = `<div class='savefiles popup'>
              <div class='savefiles__top'>
                  <h2>Saves</h2> 
                  <button class='leave'>X</button> 
              </div>
          <div class='savefiles__list'> 
              <div class='savefiles__slot' data-title='one'>
                  <h3>Save 1</h3> 
                  <button class='savefile__rename'>Rename</button>
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot' data-title='two'>
                  <h3>Save 2</h3> 
                  <button class='savefile__rename'>Rename</button>
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot' data-title='three'>
                  <h3>Save 3</h3> 
                  <button class='savefile__rename'>Rename</button> 
                  <button class='savefile__select'>Select</button>
              </div>
          </div>
          </div>`;
    preventMultiplePopups(popupHTML, container);
    initExitPopup();
    Savefiles.switchSavefile()
    console.log(localStorage);
    Savefiles.highlightSelectedSave();
});
}
}
