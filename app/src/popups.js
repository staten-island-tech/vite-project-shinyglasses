import { initExitPopup, preventMultiplePopups,changeSelectedButtonCSS } from "./misc";

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
        const container = document.querySelector('.game');
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

        const btns = document.querySelectorAll('.shop__item');
        console.log(btns);
        btns.forEach(btn => btn.addEventListener('click', function(event){
                const type = event.target.textContent.toLowerCase();
                console.log(type);
                for (let i = 0; i < btns.length; i++) {
                    btns[i].style.backgroundColor = 'var(--button)';
                }
                    btn.style.backgroundColor = 'var(--selected-button)'
            })
        )
        const buyBtn = document.querySelector('.buy');
        buyBtn.addEventListener('click', function() {
            const inputElement = document.getElementById('name');
            const inputValue = inputElement.value;
            console.log(inputValue);
        })
    })
}
