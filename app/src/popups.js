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
        changeSelectedButtonCSS(btns, btn);
      })
    );
    const buyBtn = document.querySelector(".buy");
    buyBtn.addEventListener("click", function () {
      const inputElement = document.getElementById("name");
      const inputValue = inputElement.value;
      if (checkIfPetNameTaken(inputValue)) {
        const area  = document.querySelector('.pets')
        area.insertAdjacentHTML('afterbegin', `
          <div class='nametaken popup'>
          <h2>Name Taken. Try a different name</h2>
          <button class='leave'>X</button>
          </div>`)
          initExitPopup()
      } else if (checkifNoPetName(inputValue)) {
        const area  = document.querySelector('.pets')
        area.insertAdjacentHTML('afterbegin', `
          <div class='noname popup'>
          <h2>No Name. Please put a name</h2>
          <button class='leave'>X</button>
          </div>`)
          initExitPopup()
      } 
      else {
       const pet = new Pet(inputValue, type);
      inventory.push(pet);
      
      Savefiles.updateSaveInventory(inventory);
      
      console.log(localStorage) 
      pet.setUpPet(); 
      }
    });
  });
}
function checkifNoPetName(name) {
  if (name === '') {
    return true
  }
}
function checkIfPetNameTaken(name) {
  let save = Savefiles.getSelectedSave();
  console.log(save)
  for (let i = 0; i < save.inventory.length; i++) {
      if (name === save.inventory[i].name) {
        return true
      }
  } 
  return false
  
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

static updateSaveInventory(inventory) {
  let num = 0
  for (let i = 0; i < localStorage.length; i++) {
      
      if (i === 0) {
        num = 'one'
      } else if (i === 1) {
        num = 'two'
      } else {
        num = 'three'
      }
    }
  
  let save = Savefiles.getSelectedSave();
  save.inventory = inventory;
  localStorage.setItem(`save__${num}`, JSON.stringify(save))
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
  
            let selectedSlot = element.closest('.savefiles__slot');
            let selectedHeading = selectedSlot.querySelector('h3');
            selectedSlot.style.backgroundColor = 'var(--selected-button)';
            selectedHeading.style.backgroundColor = 'var(--selected-button)';
              
            Savefiles.loadSavefile();
        });
    });
}
static loadedPets = []; 
static loadSavefile() {
  let save = Savefiles.getSelectedSave();
  const pets = document.querySelectorAll('.pet');
   pets.forEach(pet => {
      pet.remove();
  })
  Savefiles.loadedPets.forEach(pet =>
    pet.clearIntervals()
  )
  if (save.inventory.length === 0) {
    Savefiles.loadedPets = []
  }
  console.log(save.inventory)
    for (let i = 0; i < save.inventory.length; i++) {
      const pet = new Pet(save.inventory[i].name, save.inventory[i].petType)
      pet.setUpPet();
      Savefiles.loadedPets.push(pet);
      console.log(Savefiles.loadedPets)
  } 
   
}  

static getSelectedSave() {
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const save = JSON.parse(localStorage.getItem(key));
      if (save.active) {
        return save
      }
    }
}
static highlightSelectedSave() {
  let save = Savefiles.getSelectedSave();
  const slot = document.querySelector(`[data-title='${save.name}']`);
  const heading = slot.querySelector('h3')
  slot.style.backgroundColor = 'var(--selected-button)'
  heading.style.backgroundColor = 'var(--selected-button)'
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
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot' data-title='two'>
                  <h3>Save 2</h3> 
                  <button class='savefile__select'>Select</button>
              </div>
              <div class='savefiles__slot' data-title='three'>
                  <h3>Save 3</h3> 
                  <button class='savefile__select'>Select</button>
              </div>
          </div>
          </div>`;
    preventMultiplePopups(popupHTML, container);
    initExitPopup();
    Savefiles.switchSavefile()
    Savefiles.highlightSelectedSave();
});
}
}
