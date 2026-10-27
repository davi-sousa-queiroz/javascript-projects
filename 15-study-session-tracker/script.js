const newSessionLink = document.querySelector('.new-session-link')
const statisticsLink = document.querySelector('.statistics-link')
const sessionHistoryLink = document.querySelector('.session-history')

const newSessionSection = document.querySelector('#new-session')
const statisticsSection = document.querySelector('#statistics')
const sessionHistorySection = document.querySelector('#session-history')
const historyList = document.querySelector('.history-list')
const historyEmpty = document.querySelector('.history-empty')

const timer = document.querySelector('.timer')
const subjectText = document.querySelector('.label')
const subjectInput = document.querySelector('.subject-input')
const confirmButton = document.querySelector('.confirm')

const sessionContainer = document.querySelector('.session-container')

confirmButton.addEventListener('click', initialize)
newSessionLink.addEventListener('click', showNewSession)
statisticsLink.addEventListener('click', showStatistics)
sessionHistoryLink.addEventListener('click', showSessionHistory)

function showSection (sectionToShow) {
    [newSessionSection, statisticsSection, sessionHistorySection].forEach(section => {
        section.classList.toggle('hidden', section !== sectionToShow)
    })
}

function showNewSession (event) {
    event.preventDefault()
    showSection(newSessionSection)
}

function showStatistics (event) {
    event.preventDefault()
    updateStatistics()
    showSection(statisticsSection)
}

function showSessionHistory (event) {
    event.preventDefault()
    renderSessionHistory()
    showSection(sessionHistorySection)
}

const hoursStudied = document.querySelector('[data-stat="hours"]')
const sessionCount = document.querySelector('[data-stat="sessions"]')
const longestSession = document.querySelector('[data-stat="longest"]')

let clock = 0
let timerInterval = null

const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]')

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

function renderSessionHistory () {
    historyList.replaceChildren()
    historyEmpty.classList.toggle('hidden', sessions.length > 0)

    sessions.forEach(session => {
        const item = document.createElement('li')
        const subject = document.createElement('span')
        const duration = document.createElement('span')

        item.className = 'history-item'
        subject.className = 'history-subject'
        duration.className = 'history-duration'
        subject.textContent = session.subject || 'Untitled session'
        duration.textContent = formatTime(session.time)

        item.append(subject, duration)
        historyList.appendChild(item)
    })
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
    localStorage.setItem('studySessions', JSON.stringify(sessions))
    updateStatistics()
    renderSessionHistory()

    sessionContainer.querySelector('.timer-controls').remove()
    clock = 0
    timer.textContent = '00:00:00'
    subjectText.textContent = 'What are you studying today?'
    sessionContainer.appendChild(subjectInput)
    sessionContainer.appendChild(confirmButton)
    subjectInput.value = ''
}

updateStatistics()
renderSessionHistory()
