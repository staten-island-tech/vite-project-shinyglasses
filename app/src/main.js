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
        this.maxHealthLevel = 10; 
        this.currentHunger = 10;
        this.currentSadness = 0;
        this.currentHealth = 10;
        this.status = 'happy';
    
    }
    decreasePetHunger() {
        let self = this
        setInterval(function() {
            if (self.currentHunger > 0) {
                self.currentHunger--;
                self.updatePetStatus();
            }
            }   
            , 200); 
            //in ms
    }
    //this prob gets messed up bc the this in set interval isnt referring to the obj this
    increasePetHunger() {
        let self = this;
        const btn = document.querySelector('.feed_pet');
        btn.addEventListener('click', function() {
            const container = document.querySelector('.game')
            const petImg = self.getPetImage()
            container.insertAdjacentHTML('beforeend', 
                `<div class=feed>
                    <button class='leave'>X</button>   
                    <img class='feed__pet' src=${petImg}>
                    <img class='food' src='food.png'>
                    <div class='move'>
                        <button id='up'>Up</button>
                        <button id='down'>Down</button>
                        <button id='left'>Left</button>
                        <button id='right'>Right</button>
                    </div>
                </div>`)
            self.currentHunger -= 1;
            self.updatePetStatus();
            self.petMovement();
        })
        }
    petMovement() {
        const btnContainer = document.querySelector('.move')
        btnContainer.addEventListener('click', function(event) {
            const btn = event.target.textContent;
            const pet = document.querySelector('.feed__pet')
            if (btn === 'Up') {
                pet.style.marginBottom += '20%';
            } else if (btn === 'Down') {
                pet.style.marginTop += '20%';
            } else if (btn === 'Right') {
                pet.style.marginLeft += '20%';
            } else if (btn === 'Left') {
                pet.style.marginRight += '20%';
            }
        })
    }
    decreasePetHealth() {
        console.log('ryb')
        let self = this;
        setInterval(function() {
            if (self.currentHunger === 0) {
                self.currentHealth--;
                self.updatePetStatus()
            }
        }, 2000) }
        
    increasePetSadness() {

    }
    decreasePetSadness() {
        
    }
    getPetImage() {
    //if i add pets besides dogs i need to change 
    // the status_dog 
    if (this.currentHunger > 5 || this.currentHealth < 5) {
        this.status = 'hurt'
    } 
    const array = {
        'hurt': 'hurt_dog.png',
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
        container.insertAdjacentHTML('beforeend', `<h3>Hunger: ${this.currentHunger}/${this.maxHungerLevel} </h3>
                <h3>Sadness: ${this.currentSadness}/${this.maxSadnessLevel}</h3>
                <h3>Health: ${this.currentHealth}/${this.maxHealthLevel}</h3>
              `);
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
                <h3>Health: ${this.currentHealth}/${this.maxHealthLevel}</h3>
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
pet.decreasePetHealth();