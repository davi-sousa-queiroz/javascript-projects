const gameBackground = document.querySelector('.game-background')
const hungerStat = document.querySelector('#hunger-val')
const happyStat = document.querySelector('#happy-val')
const energyStat = document.querySelector('#energy-val')
const dayCount = document.querySelector('#day-val')

const feed = document.querySelector('.btn-feed')
const play = document.querySelector('.btn-play')
const sleep = document.querySelector('.btn-sleep')
const nextday = document.querySelector('.btn-next')

const pet = {
    maxStat: 10,
    hunger: 8,
    happy: 5,
    energy: 9,

    updateStats(hunger, happy, energy) {
        hungerStat.textContent = hunger
        happyStat.textContent = happy
        energyStat.textContent = energy
    },
    
    newDay() {
        this.hunger = Math.max(0, this.hunger - 4);
        this.happy = Math.max(0, this.happy - 3);
        this.energy = Math.max(0, this.energy - 1);
        this.updateStats(this.hunger, this.happy, this.energy)
    },

    feed() {
        this.hunger = Math.min(this.maxStat, this.hunger + 3);
        this.energy = Math.min(this.maxStat, this.energy + 1);
        this.updateStats(this.hunger, this.happy, this.energy)
    },

    play() {
        this.happy = Math.min(this.maxStat, this.happy + 3);
        this.energy = Math.max(0, this.energy - 2);
        this.hunger = Math.max(0, this.hunger - 1);
        this.updateStats(this.hunger, this.happy, this.energy)
    },

    sleep() {
        this.energy = Math.min(this.maxStat, this.energy + 5); 
        this.hunger = Math.max(0, this.hunger - 2);
        this.updateStats(this.hunger, this.happy, this.energy)
    }
}

feed.addEventListener('click', () => pet.feed())
play.addEventListener('click', () => pet.play())
sleep.addEventListener('click', () => pet.sleep())
nextday.addEventListener('click', () => pet.newDay())