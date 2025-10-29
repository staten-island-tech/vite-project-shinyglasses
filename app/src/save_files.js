export function createSaveFile(name, pet) {
    savefiles = document.querySelector('#savefiles');
    savefiles.innerHTML = `<div class='savefile'> <p>Name: ${name}, pets: ${pet}</p>, 
    </div>`
    const userProfile = { 'name': name, 'pets': [pet], 'theme': 'light'};
    console.log(userProfile)
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

export function accessSaveFile() {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
        const userProfile = JSON.parse(storedUserProfile);
        console.log(userProfile.name);
    }
}

