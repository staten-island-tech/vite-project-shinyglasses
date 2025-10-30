function changeTheme() { 
    btn = document.querySelector('.theme');
    container = document.body;
    btn.addEventListener('click', function() {
        if (container.classList.contains('light')) {
            container.classList.remove('light');
            container.classList.add('dark');
        } else if (container.classList.contains('dark')) {
            container.classList.remove('dark');
            container.classList.add('light')
        }
        }
    )
}

export function getPetImage(petStatus) {
    //if i add pets besides dogs i need to change 
    // the status_dog 
    const array = {
        'tired': 'public/tired_dog.png',
        'joyful': 'public/joyful_dog.png',
        'sad': 'public/sad_dog.png',
        'happy': 'public/happy_dog.png'
    }
    const imgName = array[petStatus];
    return imgName
}
changeTheme()