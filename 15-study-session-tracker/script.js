const newSessionLink = document.querySelector('.new-session')
const statisticsLink = document.querySelector('.statistics-link')
const sessionHistoryLink = document.querySelector('.session-history')

const timer = document.querySelector('.timer')
const subjectText = document.querySelector('.label')
const subjectInput = document.querySelector('.subject-input')
const confirmButton = document.querySelector('.confirm')

const sessionContainer = document.querySelector('.session-container')

confirmButton.addEventListener('click', initialize)

let clock = 0

function initialize () {
    replaceLabel()
    startTimer()
    removal()
    renderTimerControls()
}

function replaceLabel () {
    let subject = subjectInput.value
    subjectText.textContent = `Studying ${subject}...`
}

function startTimer () {
    const timerInterval = setInterval (() => {
        clock++
        const hours = Math.floor(clock / 3600)
        const minutes = Math.floor((clock % 3600) / 60)
        const seconds = clock % 60
    
        const displayHours = String(hours).padStart(2, '0')
        const displayMinutes = String(minutes).padStart(2, '0')
        const displaySeconds = String(seconds).padStart(2, '0')
    
    timer.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`
    }, 1000)
}

function removal () {
    subjectInput.remove()
    confirmButton.remove()
}

function renderTimerControls () {
    const controls = document.createElement('div')
    const pauseBtn = document.createElement('button')
    const resumeBtn = document.createElement('button')
    const concludeBtn = document.createElement('button')

    controls.className = 'timer-controls'
    pauseBtn.className = 'timer-control pause-control'
    resumeBtn.className = 'timer-control resume-control'
    concludeBtn.className = 'timer-control conclude-control'

    pauseBtn.textContent = 'Pause'
    resumeBtn.textContent = 'Resume'
    concludeBtn.textContent = 'Conclude'

    controls.appendChild(pauseBtn)
    controls.appendChild(resumeBtn)
    controls.appendChild(concludeBtn)
    sessionContainer.appendChild(controls)
}