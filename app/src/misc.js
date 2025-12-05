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
export function checkCollision(rect1, rect2) {
  
  if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
    console.log('true')
    return true;
  }
  return false;
}