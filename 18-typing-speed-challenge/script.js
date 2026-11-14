const passage = document.querySelector('.passage')
const inputField = document.querySelector('.input-field')
const timer = document.querySelector('.timer')
const wpmDisplay = document.querySelector('.wpm')
const timeOptions = document.querySelector('.time-options')
const timerButtons = document.querySelectorAll('.time-button')

let fullPassageCorrect = false
let timeLeft = 5
let startingTime = timeLeft
let timerInterval = null
let timerStarted = false

timer.textContent = timeLeft

inputField.addEventListener('input', detectInput)

timerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (timerStarted) {
            return
        }

        timerButtons.forEach((timerButton) => timerButton.classList.remove('active'))
        button.classList.add('active')
        timeLeft = Number(button.dataset.time)
        startingTime = timeLeft
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
        startTimer()
    }
    const currentInput = inputField.value
    const originalPassage = passage.textContent
    const characterSpans = passage.querySelectorAll('span')

    if (currentInput === originalPassage) {
        console.log('correct full passage!')
        fullPassageCorrect = true
        inputField.disabled = true
        clearInterval(timerInterval)
        timeOptions.classList.remove('hidden')
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

    const elapsedSeconds = startingTime - timeLeft

    if (elapsedSeconds === 0) {
        wpmDisplay.textContent = 0
        return
    }

    const elapsedMinutes = elapsedSeconds / 60
    const wordsPerMinute = (correctCharacters / 5) / elapsedMinutes
    wpmDisplay.textContent = Math.round(wordsPerMinute)
}

function startTimer () {
    timerInterval = setInterval(() => {
        if (timeLeft <= 1) {
            timeLeft = 0
            timer.textContent = timeLeft
            updateWpm()
            clearInterval(timerInterval)
            inputField.disabled = true
            timeOptions.classList.remove('hidden')
            return
        }

        timeLeft--
        timer.textContent = timeLeft
        updateWpm()
    }, 1000);
}

selectRandomPassage(passages)