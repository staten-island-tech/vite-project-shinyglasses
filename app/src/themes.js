export function themeButtons(btns) {
        console.log(btns);
        btns.forEach(btn => btn.addEventListener('click', function(event) {
        console.log('changing colooor')
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
        container.insertAdjacentHTML('afterbegin', `<div class='themes'</div>
        <h2>Themes</h2> 
        <div class="theme__options"> 
        <button class="theme">Light</button>
        <button class="theme">Dark</button>
        <button class="theme">Strawberry</button>
        <button class="theme">Peaches</button>
      </div>
      </div>`)
    const btns = document.querySelectorAll('.theme');
    themeButtons(btns);

    })
}
