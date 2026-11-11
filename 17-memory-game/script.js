const levelDisplay = document.querySelector('.level')
const startButton = document.querySelector('.start-button')
const redButton = document.querySelector('.red')
const yellowButton = document.querySelector('.yellow')
const greenButton = document.querySelector('.green')
const blueButton = document.querySelector('.blue')

let level = 0

startButton.addEventListener('click', start)

function start() {
    startButton.style.display = 'none'
    level++
    levelDisplay.textContent = `${level}`
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