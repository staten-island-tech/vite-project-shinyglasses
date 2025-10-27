export function createPet(name, hungerLevel, sadnessLevel, angerLevel) {
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

function increasePetHunger(pet) {
    pet.hungerLevel += 1/maxHungerLevel;
}

function decreasePetHunger(pet) {
    pet.hungerLevel -= 1/maxHungerLevel;
}

export function petHunger() {
    
    //every 15  sec the pet hunger decreases by 1 
    const interval = setInterval(increasePetHunger, 15000); // 15000 milliseconds = 15 seconds
    //prob need something like lambda for the increasepethuger
    console.log("This action is performed every 15 seconds.")
}

export function petAnger() {

}

export function petSadness() {

}

