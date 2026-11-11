const levelDisplay = document.querySelector('.level')
const startButton = document.querySelector('.start-button')
const redButton = document.querySelector('.red')
const yellowButton = document.querySelector('.yellow')
const greenButton = document.querySelector('.green')
const blueButton = document.querySelector('.blue')
const gameMessage = document.querySelector('.game-message')

let level = 0
let correctButton
let canAnswer = false

startButton.addEventListener('click', start)
redButton.addEventListener('click', () => checkAnswer(1))
blueButton.addEventListener('click', () => checkAnswer(2))
greenButton.addEventListener('click', () => checkAnswer(3))
yellowButton.addEventListener('click', () => checkAnswer(4))

function start() {
    startButton.style.display = 'none'
    level++
    levelDisplay.textContent = `${level}`
    play()
}

function play() {
    level1()
}

function getRandomTrigger(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (num === 1) {
    triggerRed()
  } else if (num === 2) {
    triggerBlue()
  } else if (num === 3) {
    triggerGreen()
  } else if (num === 4) {
    triggerYellow()
  }
  return num
}

function level1() {
    canAnswer = false
    gameMessage.style.color = '#f5f6fb'
    gameMessage.textContent = 'Watch the color, then repeat it.'
    correctButton = getRandomTrigger(1, 4)
    setTimeout(() => {
        canAnswer = true
        gameMessage.textContent = 'Your turn!'
    }, 1500)
}

function checkAnswer(button) {
    if (!canAnswer) return

    canAnswer = false
    if (button === correctButton) {
        gameMessage.style.color = 'green'
        gameMessage.textContent = 'Correct! You got it.'
        setTimeout(() => {
            gameMessage.style.color = '#f5f6fb'
            gameMessage.textContent = 'Watch the color, then repeat it.'
        }, 1000);
    } else {
        gameMessage.style.color = '#c50303'
        gameMessage.textContent = 'Not quite. Press start to try again.'
        startButton.style.display = 'inline-block'
        startButton.textContent = 'Play Again'
        level = 0
        levelDisplay.textContent = `${level}`
    }
}

function triggerRed () {
    setTimeout(() => {
        redButton.style.background = 'linear-gradient(145deg, #c40d22, #550213)'
        setTimeout(() => {
            redButton.style.background = 'linear-gradient(145deg, #ff6173, #d92e50)'
        }, 500);
    }, 500);
}

function triggerYellow () {
    setTimeout(() => {
        yellowButton.style.background = 'linear-gradient(145deg, #c58a16, #6b3f08)'
        setTimeout(() => {
            yellowButton.style.background = 'linear-gradient(145deg, #ffdc65, #e99e24)'
        }, 500)
    }, 500)
}

function triggerGreen () {
    setTimeout(() => {
        greenButton.style.background = 'linear-gradient(145deg, #128451, #075435)'
        setTimeout(() => {
            greenButton.style.background = 'linear-gradient(145deg, #59e7a9, #1cae79)'
        }, 500)
    }, 500)
}

function triggerBlue () {
    setTimeout(() => {
        blueButton.style.background = 'linear-gradient(145deg, #245db5, #163878)'
        setTimeout(() => {
            blueButton.style.background = 'linear-gradient(145deg, #6bb6ff, #3974e8)'
        }, 500)
    }, 500)
}