const newSessionLink = document.querySelector('.new-session-link')
const statisticsLink = document.querySelector('.statistics-link')
const sessionHistoryLink = document.querySelector('.session-history')

const newSessionSection = document.querySelector('#new-session')
const statisticsSection = document.querySelector('#statistics')

const timer = document.querySelector('.timer')
const subjectText = document.querySelector('.label')
const subjectInput = document.querySelector('.subject-input')
const confirmButton = document.querySelector('.confirm')

const sessionContainer = document.querySelector('.session-container')

confirmButton.addEventListener('click', initialize)
newSessionLink.addEventListener('click', showNewSession)
statisticsLink.addEventListener('click', showStatistics)

function showNewSession (event) {
    event.preventDefault()
    newSessionSection.classList.remove('hidden')
    statisticsSection.classList.add('hidden')
}

function showStatistics (event) {
    event.preventDefault()
    updateStatistics()
    newSessionSection.classList.add('hidden')
    statisticsSection.classList.remove('hidden')
}

const hoursStudied = document.querySelector('[data-stat="hours"]')
const sessionCount = document.querySelector('[data-stat="sessions"]')
const longestSession = document.querySelector('[data-stat="longest"]')

let clock = 0
let timerInterval = null

const sessions = []

function updateStatistics () {
    const totalTime = sessions.reduce((total, session) => total + session.time, 0)
    const longestTime = sessions.reduce(
        (longest, session) => Math.max(longest, session.time),
        0
    )

    hoursStudied.textContent = (totalTime / 3600).toFixed(2)
    sessionCount.textContent = sessions.length
    longestSession.textContent = formatTime(longestTime)
}

function formatTime (timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

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
    if (timerInterval !== null) {
        return
    }

    timerInterval = setInterval(() => {
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

    pauseBtn.addEventListener('click', pauseTimer)
    resumeBtn.addEventListener('click', resumeTimer)
    concludeBtn.addEventListener('click', concludeSession)
}

function pauseTimer () {
    clearInterval(timerInterval)
    timerInterval = null
}

function resumeTimer () {
    startTimer()
}

function concludeSession () {
    pauseTimer()

    const sessionData = {
        time: clock,
        subject: subjectInput.value.trim()
    }
    sessions.push(sessionData)
    updateStatistics()

    sessionContainer.querySelector('.timer-controls').remove()
    clock = 0
    timer.textContent = '00:00:00'
    subjectText.textContent = 'What are you studying today?'
    sessionContainer.appendChild(subjectInput)
    sessionContainer.appendChild(confirmButton)
    subjectInput.value = ''
}
