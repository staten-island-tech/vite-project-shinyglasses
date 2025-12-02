export function initExitPopup() {
    const btns = document.querySelectorAll('.leave');
    btns.forEach(btn => btn.addEventListener('click', function(element) {
        const container = element.target.closest('.popup');
        container.remove()
    }))
}

export function preventMultiplePopups(popupHTML, container) {
    const popup = document.querySelector('.popup')
    if (!popup) {
        container.insertAdjacentHTML('beforebegin', popupHTML);
    }
}