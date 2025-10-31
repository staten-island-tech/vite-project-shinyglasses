import './style.css'

class SaveFiles {
    static showSaveFile() {
        let pet = new Pet('johnny')
        let imgName = pet.getPetImage();
        console.log(imgName);
        let html = `<div class='game'><img class='pet' src='${imgName}'><button class='feed_pet'>Feed</button><button class='play'>Play with</button></div>`
        //add actual pet image later
        const container = document.querySelector('.container');
        container.insertAdjacentHTML('beforeend', html);
    }
    static createSaveFile(name, pet) {
        const savefiles = document.querySelector('#savefiles');
        savefiles.innerHTML = `<div class='savefile'> <p>Name: ${name}, pets: ${pet}</p>, 
        </div>`
        const userProfile = { 'name': name, 'pets': [pet], 'theme': 'light'};
        console.log(userProfile)
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

 accessSaveFile() {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
        const userProfile = JSON.parse(storedUserProfile);
        console.log(userProfile.name);
    }
}}

function changeTheme() { 
    const btn = document.querySelector('.theme') 
    const container = document.body;
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

class Pet {
    constructor(name) {
        this.name = name;
        this.maxHungerLevel = 10;
        this.maxSadnessLevel = 10;
        this.maxTirednessLevel = 10; 
        this.currentHunger = 0
        this.currentSadness = 0;
        this.currentTiredness = 0;
        this.status = 'happy';
    }
    increasePetHunger() {
         //every 15  sec the pet hunger decreases by 1 
        const interval = setInterval(this.currentHunger += 1/this.maxHungerLevel, 15000); // 15000 milliseconds = 15 seconds
        //prob need something like lambda for the increasepethuger
    }
    decreasePetHunger() {
        this.currentHunger -= 1/this.maxHungerLevel;
    }
    increasePetTiredness() {

    }
    decreasePetTiredness() {

    }
    increasePetSadness() {

    }
    decreasePetSadness() {
        
    }
    getPetStatus() {

    }
    getPetImage() {
    //if i add pets besides dogs i need to change 
    // the status_dog 
    const array = {
        'tired': 'public/tired_dog.png',
        'joyful': 'public/joyful_dog.png',
        'sad': 'public/sad_dog.png',
        'happy': 'public/happy_dog.png'
    }
    const imgName = array[this.status]; 
    return imgName
}}   

function createPet(name, hungerLevel, sadnessLevel, angerLevel) {
    //hungry, sad, angry, name
    const maxHungerLevel = 10;
    const maxSadnessLevel = 10;
    const maxAngerLevel = 10; 
    const pet = {
        'name': name, 
        'hungerLevel': hungerLevel/maxHungerLevel,
        'sadnessLevel': sadnessLevel/maxSadnessLevel,
        'angerLevel': angerLevel/maxAngerLevel
    }
    return pet
}

changeTheme();
const pet = new Pet('johnny');
SaveFiles.showSaveFile();