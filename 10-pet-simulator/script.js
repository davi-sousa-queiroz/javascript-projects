const gameBackground = document.querySelector('.game-background')
const hungerStat = document.querySelector('#hunger-val')
const happyStat = document.querySelector('#happy-val')
const energyStat = document.querySelector('#energy-stat')
const dayCount = document.querySelector('#day-val')

const pet = {
    maxStat: 10,
    hunger: 8,
    happy: 5,
    energy: 9,
    
    newDay() {
        this.hunger = Math.max(0, this.hunger - 4);
        this.happy = Math.max(0, this.happy - 3);
        this.energy = Math.max(0, this.energy - 1);
    },

    feed() {
        this.hunger = Math.min(this.maxStat, this.hunger + 3);
        this.energy = Math.min(this.maxStat, this.energy + 1);
    },

    play() {
        this.happy = Math.min(this.maxStat, this.happy + 3);
        this.energy = Math.max(0, this.energy - 2);
        this.hunger = Math.max(0, this.hunger - 1);
    },

    sleep() {
        this.energy = Math.min(this.maxStat, this.energy + 5); 
        this.hunger = Math.max(0, this.hunger - 2);
    }
}
