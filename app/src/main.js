import './style.css'
const notifications = [{'name': 'hunger'
}];


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
        this.maxAffectionLevel = 10;
        this.maxHealthLevel = 10; 
        this.currentHunger = 10;
        this.currentAffection = 10;
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
            , 1000); 
            //in ms
    }
    getRandomFoodPosition() {

        const container = document.querySelector(".feed");
        const movement = document.querySelector('.move')
        if (container) {
          let containerCoords = container.getBoundingClientRect();
          let movementCoords = movement.getBoundingClientRect();
          console.log(containerCoords);
          const yMin = containerCoords.bottom - movementCoords.bottom;
          const yMax = containerCoords.top;
          const xMax = containerCoords.right;
          const xMin = containerCoords.left;
          //i need to exclude the bottom bar
          let x = Math.floor(Math.random() * (xMax - xMin + 1));
          let y = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
          console.log(x);
          container.insertAdjacentHTML('afterbegin', `<img class='food' src='food.png'>`)
        const food = document.querySelector('.food');
        food.style.top = `${y}px`
        food.style.left = `${x}px`
        }
        
    }
    //this prob gets messed up bc the this in set interval isnt referring to the obj this
    increasePetHunger() {
        let self = this;
        const btn = document.querySelector('.feed_pet');
        btn.addEventListener('click', function() {
            const container = document.querySelector('.game')
            const petImg = self.getPetImage()
            console.log(self.currentHunger)
            container.insertAdjacentHTML('beforeend', 
                `<div class=feed>
                    
                    <button class='leave'>X</button>   
                    <img class='feed__pet' src=${petImg}>
                    
                    <div class='move'>
                        <button id='up'>Up</button>
                        <button id='down'>Down</button>
                        <button id='left'>Left</button>
                        <button id='right'>Right</button>
                    </div>
                </div>`)
            self.getRandomFoodPosition();
            self.currentHunger -= 1;
            self.updatePetStatus();
            self.petMovement();
        })
        }
    petMovement() {
        const btnContainer = document.querySelector('.move')
        const pet = document.querySelector('.feed__pet')
        const food = document.querySelector('.food')
        let x = pet.offsetLeft;
        let y = pet.offsetTop;    
        let speed = 5;

        btnContainer.addEventListener('click', function(event) {
            const btn = event.target.textContent;
            
            if (btn === 'Up') {
                y -= speed;
            } else if (btn === 'Down') {
                y += speed;
            } else if (btn === 'Right') {
                x += speed;
            } else if (btn === 'Left') {
                x -= speed;
            }
            pet.style.top = `${y}px`;
            pet.style.left = `${x}px`;
            if (checkCollision(pet, food)) {
                this.currentHunger++;
                notifications.push('+1 Hunger')
            }
        })
        
    }
    decreasePetHealth() {
        let self = this;
        setInterval(function() {
            if (self.currentHunger === 0) {
                self.currentHealth--;
                self.updatePetStatus()
            }
        }, 2000) }
        
    increasePetAffection() {

    }
    decreasePetAffection() {
        
    }
    getPetImage() {
    //if i add pets besides dogs i need to change 
    // the status_dog 
    
    const array = {
        'hurt': 'hurt_dog.png',
        'joyful': 'joyful_dog.png',
        'sad': 'sad_dog.png',
        'happy': 'happy_dog.png'
    }

    const imgName = array[this.status]; 
    console.log(imgName)
    return imgName
    }
    updatePetStatus() {
        const pet = document.querySelector('.pet')
        if (this.currentHealth < 5) {
            this.status = 'sad'
            pet.src = 'sad_dog.png'
        }
        else if (this.currentHunger < 5) {
            this.status = 'hurt'
            pet.src = 'hurt_dog.png'
        }
        const container = document.querySelector('.pet__status');
        container.innerHTML = '';
        container.insertAdjacentHTML('beforeend', `<h3>Hunger: ${this.currentHunger}/${this.maxHungerLevel} </h3>
                <h3>Affection: ${this.currentAffection}/${this.maxAffectionLevel}</h3>
                <h3>Health: ${this.currentHealth}/${this.maxHealthLevel}</h3>
              `);
        }
    showPet() {
        let pet = new Pet('Johnny')
        let imgName = pet.getPetImage();
        let html = `<div class='game'>
        <div class='pet__container'> 
        <h2 class='name'>${this.name}</h2>
            <img class='pet' src='${imgName}'>
            <div class='pet__bottom'>
            <div class='pet__status'>
                <h3>Hunger: <b>${this.currentHunger}</b>/${this.maxHungerLevel} </h3>
                <h3>Affection: <b> ${this.currentAffection} </b>/${this.maxAffectionLevel}</h3>
                <h3>Health: <b>${this.currentHealth} </b>/${this.maxHealthLevel}</h3>
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

function checkCollision(rect1, rect2) {
  
  if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {

    console.log('true')
    return true;
  }
  return false;
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

function shop() {
    const btn = document.querySelector('.nav__shop');
    btn.addEventListener('click', function() {
        const container = document.querySelector('.game');
        container.insertAdjacentHTML('afterbegin', 
            `<div class='shop'>
                <div class='shop__top'>
                    <h2>Shop </h2> 
                    <button class='leave'>X</button> 
                </div>
              <div class='shop__items'> 
              <button class='shop__item'>Cat</button>
              <button class='shop__item'>Dog</button>
              <button class='shop__item'>Bunny</button>
              </div>
              </div>`)
              //happy doggy = money
    })
}

function notification(notifications) {
    let notifsString = ``
    
    const container = document.querySelector('body')
    const notifsContainer = document.querySelector('.notifications')
    notifsContainer.insertAdjacentHTML('afterbegin', 
        `<li></li>`
    )

    let html = `<div class='notification'>
                <h2>Notifications</h2>
                <ul class='notifications'>
                </ul>
                </div>`
    container.insertAdjacentHTML('afterbegin',
        html
    )
}

changeTheme();
themeButtons();
const pet = new Pet('johnny');
pet.showPet();
pet.increasePetHunger();
pet.decreasePetHunger();
pet.decreasePetHealth();
pet.getRandomFoodPosition();
shop()