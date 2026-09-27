const gameBackground = document.querySelector('.game-background')
const hungerStat = document.querySelector('#hunger-val')
const happyStat = document.querySelector('#happy-val')
const energyStat = document.querySelector('#energy-val')
const dayCount = document.querySelector('#day-val')
const gameOverScreen = document.querySelector('#gameOverScreen')
const gameOverMessage = document.querySelector('#gameOverMessage')
const restartButton = document.querySelector('#restartBtn')
const petImage = document.querySelector('.pet-svg')

const feed = document.querySelector('.btn-feed')
const play = document.querySelector('.btn-play')
const sleep = document.querySelector('.btn-sleep')
const nextday = document.querySelector('.btn-next')

function animatePet(animationName) {
    petImage.classList.remove('feed-animation')
    petImage.classList.remove('play-animation')
    petImage.classList.remove('sleep-animation')
    petImage.classList.add(animationName)
}

petImage.addEventListener('animationend', () => {
    petImage.classList.remove('feed-animation')
    petImage.classList.remove('play-animation')
    petImage.classList.remove('sleep-animation')
})

const pet = {
    maxStat: 10,
    hunger: 8,
    happy: 5,
    energy: 9,
    day: 1,
    gameOver: false,

    checkGameOver() {
        if (this.hunger <= 0 || this.happy <= 0 || this.energy <= 0) {
            this.gameOver = true
            const daysSurvived = this.day - 1

            if (daysSurvived === 1) {
                gameOverMessage.textContent = 'Your pet survived 1 day.'
            } else {
                gameOverMessage.textContent = `Your pet survived ${daysSurvived} days.`
            }

            gameOverScreen.classList.remove('hidden')
            feed.disabled = true
            play.disabled = true
            sleep.disabled = true
            nextday.disabled = true
        }
    },

    updateDay() {
        this.day++
        dayCount.textContent = `${this.day}`
    },

    updateStats(hunger, happy, energy) {
        hungerStat.textContent = hunger
        happyStat.textContent = happy
        energyStat.textContent = energy
    },
    
    newDay() {
        if (this.gameOver === true) {
            return
        }

        this.hunger = Math.max(0, this.hunger - 4);
        this.happy = Math.max(0, this.happy - 3);
        this.energy = Math.max(0, this.energy - 1);
        this.updateStats(this.hunger, this.happy, this.energy)
        this.updateDay()
        this.checkGameOver()
    },

    feed() {
        if (this.gameOver === true) {
            return
        }

        this.hunger = Math.min(this.maxStat, this.hunger + 3);
        this.energy = Math.min(this.maxStat, this.energy + 1);
        this.updateStats(this.hunger, this.happy, this.energy)
        animatePet('feed-animation')
        this.checkGameOver()
    },

    play() {
        if (this.gameOver === true) {
            return
        }

        this.happy = Math.min(this.maxStat, this.happy + 3);
        this.energy = Math.max(0, this.energy - 2);
        this.hunger = Math.max(0, this.hunger - 1);
        this.updateStats(this.hunger, this.happy, this.energy)
        animatePet('play-animation')
        this.checkGameOver()
    },

    sleep() {
        if (this.gameOver === true) {
            return
        }

        this.energy = Math.min(this.maxStat, this.energy + 5); 
        this.hunger = Math.max(0, this.hunger - 2);
        this.updateStats(this.hunger, this.happy, this.energy)
        animatePet('sleep-animation')
        this.checkGameOver()
    }
}

feed.addEventListener('click', () => pet.feed())
play.addEventListener('click', () => pet.play())
sleep.addEventListener('click', () => pet.sleep())
nextday.addEventListener('click', () => pet.newDay())
restartButton.addEventListener('click', () => {
    pet.hunger = 8
    pet.happy = 5
    pet.energy = 9
    pet.day = 1
    pet.gameOver = false

    pet.updateStats(pet.hunger, pet.happy, pet.energy)
    dayCount.textContent = pet.day
    gameOverScreen.classList.add('hidden')
    feed.disabled = false
    play.disabled = false
    sleep.disabled = false
    nextday.disabled = false
})