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

function play (level) {
    if (level < 2)
}