let count = 0

const addButton = document.querySelector('.add')
const subtractButton = document.querySelector('.subtract')
const textBox = document.querySelector('.count')
const resetButton = document.querySelector('.reset')
const modeButton = document.querySelector('.mode')
const wallpaper = document.querySelector('.wall')

updateDisplay()

if (count < 0) {
    count = 0
}

function updateDisplay () {
    textBox.textContent = `Current Click Count: ${count}`
}

function updateWallpaper () {
    if (document.body.style.backgroundColor === 'rgb(255, 255, 255)') {
        document.body.style.backgroundColor = 'rgb(0, 0, 0)'
    } else {
        document.body.style.backgroundColor = "rgb(255, 255, 255)"
    }
}

addButton.addEventListener('click', () => {
    count++;
    updateDisplay();
})

subtractButton.addEventListener('click', () => {
    count --;
    if (count < 0) {
    count = 0
    }
    updateDisplay();
})

resetButton.addEventListener('click', () => {
    count = 0;
    updateDisplay();
})

modeButton.addEventListener('click', () => {
    updateWallpaper();
})