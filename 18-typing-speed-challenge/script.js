const passage = document.querySelector('.passage')
const inputField = document.querySelector('.input-field')
const timer = document.querySelector('.timer')
const wpmDisplay = document.querySelector('.wpm')
const accuracyDisplay = document.querySelector('.accuracy')
const timeOptions = document.querySelector('.time-options')
const timerButtons = document.querySelectorAll('.time-button')
const restartButton = document.querySelector('.restart-button')

let fullPassageCorrect = false
let selectedTime = 5
let timeLeft = selectedTime
let elapsedSeconds = 0
let timerInterval = null
let timerStarted = false

timer.textContent = timeLeft

inputField.addEventListener('input', detectInput)
restartButton.addEventListener('click', restartGame)

timerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (timerStarted) {
            return
        }

        timerButtons.forEach((timerButton) => timerButton.classList.remove('active'))
        button.classList.add('active')
        selectedTime = Number(button.dataset.time)
        timeLeft = selectedTime
        timer.textContent = timeLeft
    })
})

const passages = [
    'the cat fell really far down',
    'there are some shoes in that closet',
    'english is the most spoken language in the world'
]

function selectRandomPassage(array) {
    const arrayLength = array.length
    const randomIndex = Math.floor(Math.random() * arrayLength)
    const selectedPassage = array[randomIndex]
    const fragment = document.createDocumentFragment()

    for (const character of selectedPassage) {
        const characterSpan = document.createElement('span')
        characterSpan.textContent = character
        fragment.append(characterSpan)
    }

    passage.replaceChildren(fragment)
}

function detectInput() {
    if (!timerStarted) {
        timerStarted = true
        timeOptions.classList.add('hidden')
        elapsedSeconds = 0
        startTimer()
    }
    const currentInput = inputField.value
    const originalPassage = passage.textContent
    const characterSpans = passage.querySelectorAll('span')

    if (currentInput === originalPassage) {
        console.log('correct full passage!')
        fullPassageCorrect = true
        endGame()
    } else {
        fullPassageCorrect = false
    }

    characterSpans.forEach((characterSpan, index) => {
        characterSpan.classList.remove('correct', 'incorrect', 'current')

        if (index < currentInput.length) {
            const className = currentInput[index] === characterSpan.textContent
                ? 'correct'
                : 'incorrect'
            characterSpan.classList.add(className)
        } else if (index === currentInput.length) {
            characterSpan.classList.add('current')
        }
    })

    updateWpm()
    updateAccuracy()
}

function updateWpm() {
    const currentInput = inputField.value
    const originalPassage = passage.textContent
    let correctCharacters = 0

    for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === originalPassage[i]) {
            correctCharacters++
        }
    }

    if (elapsedSeconds === 0) {
        wpmDisplay.textContent = 0
        return
    }

    const elapsedMinutes = elapsedSeconds / 60
    const wordsPerMinute = (correctCharacters / 5) / elapsedMinutes
    wpmDisplay.textContent = Math.round(wordsPerMinute)
}

function updateAccuracy() {
    const currentInput = inputField.value
    const originalPassage = passage.textContent
    let correctCharacters = 0

    for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === originalPassage[i]) {
            correctCharacters++
        }
    }

    if (currentInput.length === 0) {
        accuracyDisplay.textContent = '100%'
        return
    }

    const accuracy = (correctCharacters / currentInput.length) * 100
    accuracyDisplay.textContent = `${Math.round(accuracy)}%`
}

function restartGame() {
    clearInterval(timerInterval)
    timerStarted = false
    fullPassageCorrect = false
    elapsedSeconds = 0
    timeLeft = selectedTime
    inputField.value = ''
    inputField.disabled = false
    wpmDisplay.textContent = 0
    accuracyDisplay.textContent = '100%'
    timeOptions.classList.remove('hidden')
    timer.textContent = timeLeft
    selectRandomPassage(passages)
}

function endGame() {
    clearInterval(timerInterval)
    timerStarted = false
    inputField.disabled = true
    timeOptions.classList.remove('hidden')
}

function startTimer () {
    timerInterval = setInterval(() => {
        elapsedSeconds++

        if (timeLeft <= 1) {
            timeLeft = 0
            timer.textContent = timeLeft
            updateWpm()
            endGame()
            return
        }

        timeLeft--
        timer.textContent = timeLeft
        updateWpm()
    }, 1000);
}

selectRandomPassage(passages)