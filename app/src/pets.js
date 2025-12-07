import { initExitPopup, preventMultiplePopups, checkCollision } from "./misc";

export class Pet {
    constructor(name, type) {
        this.name = name;
        this.petType = type;
        this.maxHungerLevel = 10;
        this.maxAffectionLevel = 10;
        this.maxHealthLevel = 10; 
        this.currentHunger = 10;
        this.currentAffection = 10;
        this.currentHealth = 10;
        this.status = 'happy';
        this.healthInterval = null;
        this.hungerInterval = null;
    }
    decreasePetHunger() {
        let self = this
        this.hungerInterval = setInterval(function() {
            if (self.currentHunger > 0) {
                self.currentHunger--;
                self.updatePetStatus();
            }
            }   
            , 1000); 
            //in ms
    }
    getRandomFoodPosition() {
    const container = document.querySelector(".feed");
    const movementBar = document.querySelector('.move');
    const pet = document.querySelector('.pet__img');
    const foodSize = 32; // in px

    const oldFood = container.querySelectorAll('.food');
    oldFood.forEach(f => f.remove());

    const xMax = container.clientWidth - foodSize;
    const yMax = container.clientHeight - foodSize - movementBar.clientHeight;

    let inRightPosition = false;
    let x, y;

    while (!inRightPosition) {
        x = Math.floor(Math.random() * (xMax));
        y = Math.floor(Math.random() * (yMax));
        //mins not needed bc am inserting this into the food container 
        // so its not like food will spawn before the container

        const tempFood = document.createElement("div");
        tempFood.style.position = "absolute";
        tempFood.style.width = `${foodSize}px`;
        tempFood.style.height = `${foodSize}px`;
        tempFood.style.top = `${y}px`;
        tempFood.style.left = `${x}px`;

        if (!checkCollision(tempFood, pet)) {
            inRightPosition = true;
        }
    }

    container.insertAdjacentHTML(
        'afterbegin',
        `<img class='food' src='food.png' style="position:absolute; top:${y}px; left:${x}px;">`
    );
}

    increasePetHunger() {
        let self = this;
        const btns = document.querySelectorAll('.feed_pet');
        
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
        const container = document.querySelector('.pet');

        const petImg = self.getPetImage();
        console.log(self.currentHunger);

        const popupHTML = `<div class='feed popup'>
                <button class='leave'>X</button>   
                <img class='pet__img' src='${petImg}'>
                <div class='move'>
                    <button id='up'>Up</button>
                    <button id='down'>Down</button>
                    <button id='left'>Left</button>
                    <button id='right'>Right</button>
                </div>
            </div>`;

        preventMultiplePopups(popupHTML, container);

        self.getRandomFoodPosition();
        self.currentHunger += 1;
        self.updatePetStatus();
        self.petMovement();
        initExitPopup();
        
    });
});
    }

    
    petMovement() {
    const btnContainer = document.querySelector('.move');
    const feedContainer = document.querySelector('.feed');
    const pet = document.querySelector('.pet__img');
    const food = document.querySelector('.food');
    let x = pet.offsetLeft;
    let y = pet.offsetTop;  
    let speed = 20; // in px

    btnContainer.addEventListener('click', function(event) {
        const btn = event.target.textContent;
        const containerRect = feedContainer.getBoundingClientRect();
        const movementBar = document.querySelector('.move').getBoundingClientRect();
        let newX = x;
        let newY = y;

        if (btn === 'Up') newY -= speed;
        else if (btn === 'Down') newY += speed;
        else if (btn === 'Right') newX += speed;
        else if (btn === 'Left') newX -= speed;

        const petWidth = pet.offsetWidth;
        const petHeight = pet.offsetHeight;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        
        //the container width and height work bc the x and y are relative
        // to the container so width = right most x, height = top most y
        if (newX + petWidth > containerRect.width) {
            newX = containerRect.width - petWidth;
        }
        if (newY + petHeight > containerRect.height - movementBar.height) {
            newY = containerRect.height - petHeight - movementBar.height;
        }

        x = newX;
        y = newY;
        pet.style.left = `${x}px`;
        pet.style.top = `${y}px`;

        const petRect = pet.getBoundingClientRect();
        const foodRect = food.getBoundingClientRect();
        if (checkCollision(petRect, foodRect)) {
            this.currentHunger++;
            feedContainer.remove();
            const area  = document.querySelector('.pets')
            area.insertAdjacentHTML('afterbegin', `
            <div class='hunger popup'>
            <h2>Yay! Your pet has gained one hunger</h2>
            <button class='leave'>X</button>
            </div>`)
            initExitPopup()
        }
    
    });
}

    decreasePetHealth() {
        let self = this;
        if (self.healthInterval) return; 
        
        self.healthInterval = setInterval(function() {
            if (self.currentHunger === 0) {
                self.currentHealth--;
                self.updatePetStatus()
            }
        }, 2000) 
        console.log("interval started for", self.name);

    }
        
    increasePetAffection() {

    }
    decreasePetAffection() {
        
    }
    getPetImage() {
    //if i add pets besides dogs i need to change 
    // the status_dog 
    const array = {
        'hurt': 'hurt_',
        'joyful': 'joyful_',
        'sad': 'sad_',
        'happy': 'happy_'
    }
    let imgName = array[this.status];
    imgName += `${this.petType}.png`
    return imgName;
    }
    updatePetStatus() {
        const pet = document.querySelector('.pet')
        if (this.currentHealth < 5) {
            this.status = 'sad';
            pet.src = 'sad_dog.png';
        }
        else if (this.currentHunger < 5) {
            this.status = 'hurt'
            pet.src = 'hurt_dog.png'
        }
        const names = document.querySelectorAll('.name');
        let container = null;
        names.forEach(name => {
            if (name.textContent === this.name) {
                container = name.closest('.pet').querySelector('.pet__status');
            }
        });
        if (!container) return;
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', `<h3>Hunger: ${this.currentHunger}/${this.maxHungerLevel} </h3>
                <h3>Affection: ${this.currentAffection}/${this.maxAffectionLevel}</h3>
                <h3>Health: ${this.currentHealth}/${this.maxHealthLevel}</h3>
              `);
        }
    showPet() {
        let imgName = this.getPetImage();
        let html = `<div class='pet'>
        <div class='pet__container'> 
        <h2 class='name'>${this.name}</h2>
            <img class='pet__image' src='${imgName}'>
            <div class='pet__bottom'>
            <div class='pet__status'>
                <h3>Hunger: <b>${this.currentHunger}</b>/${this.maxHungerLevel} </h3>
                <h3>Affection: <b> ${this.currentAffection} </b>/${this.maxAffectionLevel}</h3>
                <h3>Health: <b>${this.currentHealth} </b>/${this.maxHealthLevel}</h3>
            </div>
            <div class='pet__buttons'>
                <button class='feed_pet'>Feed</button>
            </div>
            </div>
        </div>    
        </div>`
        const container = document.querySelector('.pets');
        container.insertAdjacentHTML('beforeend', html);
    }
    clearIntervals() {
        if (this.healthInterval) {
            clearInterval(this.healthInterval);
            this.healthInterval = null;
        }
        if (this.hungerInterval) {
            clearInterval(this.hungerInterval);
            this.hungerInterval = null;
        }
    }
    
    setUpPet() {
        this.showPet();
        this.increasePetHunger();
        this.decreasePetHunger();
        this.decreasePetHealth();
        this.getRandomFoodPosition();
    }
}   
