import './style.css'

class SaveFiles {
    static createSaveFile(name, pet) {
        const savefiles = document.querySelector('#savefiles');
        savefiles.innerHTML = `<div class='savefile'> <p>Name: ${name}, pets: ${pet}</p>, 
        </div>`
        const userProfile = { 'name': name, 'pets': [pet], 'theme': 'light'};
        console.log(userProfile)
        localStorage.setItem('userProfile', JSON.stringify(userProfile)); 
    }
    static changeSaveFile() {

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
        let self = this
    }
    increasePetHunger() {
        setInterval(function() {
            self.currentHunger += 1;
            console.log(self.currentHunger);
            }   
            , 2000); 
            //in ms
    }
    //this prob gets messed up bc the this in set interval isnt referring to the obj this
    decreasePetHunger() {
        const btn = document.querySelector('.feed_pet');
        btn.addEventListener('click', function() {
            self.currentHunger -= 1;
            console.log(self.currentHunger);
        })
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
        'tired': 'tired_dog.png',
        'joyful': 'joyful_dog.png',
        'sad': 'sad_dog.png',
        'happy': 'happy_dog.png'
    }

    const imgName = array[this.status]; 
    return imgName
    }
    updatePetStatus() {
        const container = document.querySelector('.pet__status');
        container.innerHTML = '';
        container.insertAdjacentHTML(`<h3>Hunger: ${this.currentHunger}/${this.maxHungerLevel} </h3>
                <h3>Sadness: ${this.currentSadness}/${this.maxSadnessLevel}</h3>
                <h3>Tiredness: ${this.currentTiredness}/${this.maxTirednessLevel}</h3>`);
    }
    showPet() {
        let pet = new Pet('johnny')
        let imgName = pet.getPetImage();
        let html = `<div class='game'>
        <div class='pet__container'> 
            <img class='pet' src='${imgName}'>
            <div class='pet__bottom'>
            <div class='pet__status'>
                <h3>Hunger: ${this.currentHunger}/${this.maxHungerLevel} </h3>
                <h3>Sadness: ${this.currentSadness}/${this.maxSadnessLevel}</h3>
                <h3>Tiredness: ${this.currentTiredness}/${this.maxTirednessLevel}</h3>
            </div>
            <div class='pet__buttons'>
                <button class='feed_pet'>Feed</button><button class='play'>Play with</button>
            </div>
            </div>
        </div>    
        </div>`
        const container = document.querySelector('.container');
        container.insertAdjacentHTML('beforeend', html);
    }
}   

/* function createPet(name, hungerLevel, sadnessLevel, angerLevel) {
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
} */

function themeButtons() {
    const btns = document.querySelectorAll('.theme');
    btns.forEach(btn => btn.addEventListener('click', function(event) {
        const theme = event.target.textContent.toLowerCase();
        document.body.classList.forEach(cssClass => document.body.classList.remove(cssClass))
        document.body.classList.add(theme);
        console.log(document.body.classList)
    }))
}
changeTheme();
themeButtons();
const pet = new Pet('johnny');
pet.showPet();
pet.increasePetHunger();
pet.decreasePetHunger();