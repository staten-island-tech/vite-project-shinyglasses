import {initExitPopup,preventMultiplePopups,changeSelectedButtonCSS} from "./misc";
import { Pet } from "./pets";

const inventory = [];

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
  
}
static switchSavefile() {
    const btns = document.querySelectorAll('.savefile__select');

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            const slot = btn.closest('.savefiles__slot');
            const name = slot.querySelector('h3').textContent;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const save = JSON.parse(localStorage.getItem(key));
                save.active = (save.name === name);
                localStorage.setItem(key, JSON.stringify(save));
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
            console.log(localStorage)
            let selectedSlot = element.closest('.savefiles__slot');
            let selectedHeading = selectedSlot.querySelector('h3');
            selectedSlot.style.backgroundColor = 'var(--selected-button)';
            selectedHeading.style.backgroundColor = 'var(--selected-button)';
        });
    });
}
static  highlightSaveOnOpen() {

    let saves = JSON.parse(localStorage.getItem('savefiles')) || [];
    console.log(saves)
    let activeSave = saves.find(s => s.active === true);
    if (!activeSave) return; // nothing active yet

    const container = document.querySelector('.savefiles__list');
    const slots = container.querySelectorAll('.savefiles__slot');

    // reset all slots
    slots.forEach(slot => {
        const h3 = slot.querySelector('h3');
        slot.style.backgroundColor = 'var(--button)';
        h3.style.backgroundColor = 'var(--button)';
    });

    // highlight the one whose <h3> text matches the active save
    slots.forEach(slot => {
        const h3 = slot.querySelector('h3');

        if (h3.textContent.trim() === activeSave.name) {
            slot.style.backgroundColor = 'var(--selected-button)';
            h3.style.backgroundColor = 'var(--selected-button)';
        }
    });
}

static loadSavefile(name) {
  const savefile = JSON.parse(localStorage.getItem(`save__${name}`));
  return savefile
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
              <div class='savefiles__slot'>
                  <h3>Save 1</h3> 
                  <button class='savefile__rename'>Rename</button>
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot'>
                  <h3>Save 2</h3> 
                  <button class='savefile__rename'>Rename</button>
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot'>
                  <h3>Save 3</h3> 
                  <button class='savefile__rename'>Rename</button> 
                  <button class='savefile__select'>Select</button>
              </div>
          </div>
          </div>`;
    preventMultiplePopups(popupHTML, container);
    initExitPopup();
    Savefiles.switchSavefile()
});
}
}

function getActiveSaveName() {
    let active = null;

    for (let i = 0; i < localStorage.length; i++) {
      console.log
        const key = localStorage.key(i);

        if (!key.startsWith("save__")) continue;

        const data = JSON.parse(localStorage.getItem(key));
        if (data.active) {
            active = data.name;
            break;
        }
    }

    return active; // e.g. "one"
}
function highlightSaveOnOpen() {
    const activeName = getActiveSaveName();
    console.log(activeName)
    if (!activeName) return;

    const container = document.querySelector('.savefiles__list');
    const slots = container.querySelectorAll('.savefiles__slot');

    // reset all
    slots.forEach(slot => {
        const h3 = slot.querySelector('h3');
        slot.style.backgroundColor = 'var(--button)';
        h3.style.backgroundColor = 'var(--button)';
    });

    // highlight the active one
    slots.forEach(slot => {
        const h3 = slot.querySelector('h3');
        if (h3.textContent.trim() === activeName) {
            slot.style.backgroundColor = 'var(--selected-button)';
            h3.style.backgroundColor = 'var(--selected-button)';
        }
    });
}
