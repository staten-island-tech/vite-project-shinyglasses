import { initExitPopup, preventMultiplePopups } from "./misc";

export function themeButtons(btns) {
        btns.forEach(btn => btn.addEventListener('click', function(event) {
        const theme = event.target.textContent.toLowerCase();
        document.body.classList.forEach(cssClass => document.body.classList.remove(cssClass))
        document.body.classList.add(theme);
        console.log(document.body.classList)
    }))
}

export function showThemes() {
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
    themeButtons(btns);
    initExitPopup();

    })
}
