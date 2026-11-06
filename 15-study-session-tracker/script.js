const newSessionLink = document.querySelector('.new-session-link')
const statisticsLink = document.querySelector('.statistics-link')
const sessionHistoryLink = document.querySelector('.session-history')

const newSessionSection = document.querySelector('#new-session')
const statisticsSection = document.querySelector('#statistics')
const sessionHistorySection = document.querySelector('#session-history')
const historyList = document.querySelector('.history-list')
const historyEmpty = document.querySelector('.history-empty')
const clearHistoryButton = document.querySelector('.clear-history')

const timer = document.querySelector('.timer')
const subjectText = document.querySelector('.label')
const subjectInput = document.querySelector('.subject-input')
const confirmButton = document.querySelector('.confirm')

const sessionContainer = document.querySelector('.session-container')
const themeToggle = document.querySelector('.theme-toggle')

confirmButton.addEventListener('click', initialize)
newSessionLink.addEventListener('click', showNewSession)
statisticsLink.addEventListener('click', showStatistics)
sessionHistoryLink.addEventListener('click', showSessionHistory)
themeToggle.addEventListener('click', toggleTheme)
clearHistoryButton.addEventListener('click', clearSessionHistory)

const savedTheme = localStorage.getItem('studySessionTheme')
const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
setTheme(savedTheme || (prefersDarkTheme ? 'dark' : 'light'))

function setTheme (theme) {
    document.documentElement.dataset.theme = theme
    const isDark = theme === 'dark'
    themeToggle.setAttribute('aria-pressed', String(isDark))
    themeToggle.setAttribute(
        'aria-label',
        `Switch to ${isDark ? 'light' : 'dark'} mode`
    )
}

function toggleTheme () {
    const nextTheme = document.documentElement.dataset.theme === 'dark'
        ? 'light'
        : 'dark'

    setTheme(nextTheme)
    localStorage.setItem('studySessionTheme', nextTheme)
}

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
let startedAt = null

const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]')
const activeSession = JSON.parse(localStorage.getItem('studySessionActive') || 'null')

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
    clearHistoryButton.classList.toggle('hidden', sessions.length === 0)

    sessions.forEach((session, index) => {
        const item = document.createElement('li')
        const subject = document.createElement('span')
        const duration = document.createElement('span')
        const deleteButton = document.createElement('button')
        const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const canBody = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const canLid = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const canFace = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        item.className = 'history-item'
        subject.className = 'history-subject'
        duration.className = 'history-duration'
        deleteButton.className = 'delete-session'
        deleteButton.type = 'button'
        deleteButton.setAttribute(
            'aria-label',
            `Delete ${session.subject || 'untitled session'}`
        )
        deleteIcon.classList.add('delete-icon')
        deleteIcon.setAttribute('viewBox', '0 0 24 24')
        deleteIcon.setAttribute('fill', 'none')
        deleteIcon.setAttribute('stroke', 'currentColor')
        deleteIcon.setAttribute('stroke-linecap', 'round')
        deleteIcon.setAttribute('stroke-linejoin', 'round')
        deleteIcon.setAttribute('stroke-width', '1.8')
        deleteIcon.setAttribute('aria-hidden', 'true')
        canBody.setAttribute('d', 'M5 7h14l-1 13H6L5 7Z')
        canLid.setAttribute('d', 'M3.5 7h17M9 7V4h6v3')
        canFace.setAttribute('d', 'M9.5 11v5m5-5v5')
        deleteIcon.append(canBody, canLid, canFace)
        deleteButton.appendChild(deleteIcon)
        subject.textContent = session.subject || 'Untitled session'
        duration.textContent = formatTime(session.time)

        deleteButton.addEventListener('click', () => deleteSession(index))
        item.append(subject, duration, deleteButton)
        historyList.appendChild(item)
    })
}

function deleteSession (index) {
    sessions.splice(index, 1)
    localStorage.setItem('studySessions', JSON.stringify(sessions))
    updateStatistics()
    renderSessionHistory()
}

function clearSessionHistory () {
    if (sessions.length === 0) {
        return
    }

    const confirmed = window.confirm(
        'Are you sure you want to clear all study session history? This cannot be undone.'
    )
    if (!confirmed) {
        return
    }

    sessions.length = 0
    localStorage.setItem('studySessions', JSON.stringify(sessions))
    updateStatistics()
    renderSessionHistory()
}

function formatTime (timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function initialize () {
    replaceLabel()
    removal()
    renderTimerControls()
    startTimer()
}

function replaceLabel () {
    const subject = subjectInput.value
    subjectText.textContent = `Studying ${subject}...`
}

function startTimer () {
    if (startedAt !== null) {
        return
    }

    startedAt = Date.now()
    saveActiveSession()
    renderTimer()
    timerInterval = setInterval(renderTimer, 1000)
}

function getElapsedTime () {
    if (startedAt === null) {
        return clock
    }

    return clock + Math.floor((Date.now() - startedAt) / 1000)
}

function renderTimer () {
    timer.textContent = formatTime(getElapsedTime())
}

function saveActiveSession () {
    localStorage.setItem('studySessionActive', JSON.stringify({
        time: clock,
        subject: subjectInput.value.trim(),
        startedAt
    }))
}

function restoreActiveSession () {
    if (
        activeSession === null ||
        !Number.isFinite(activeSession.time) ||
        activeSession.time < 0 ||
        typeof activeSession.subject !== 'string' ||
        (activeSession.startedAt !== null && !Number.isFinite(activeSession.startedAt))
    ) {
        if (activeSession !== null) {
            console.error('The saved active study session is invalid and could not be restored.')
            localStorage.removeItem('studySessionActive')
        }
        return
    }

    clock = activeSession.time
    startedAt = activeSession.startedAt
    subjectInput.value = activeSession.subject
    replaceLabel()
    removal()
    renderTimerControls()

    if (startedAt !== null) {
        timerInterval = setInterval(renderTimer, 1000)
    }
    renderTimer()
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
    if (startedAt === null) {
        return
    }

    clock = getElapsedTime()
    startedAt = null
    clearInterval(timerInterval)
    timerInterval = null
    saveActiveSession()
    renderTimer()
}

function resumeTimer () {
    startTimer()
}

function concludeSession () {
    pauseTimer()

    const sessionData = {
        time: getElapsedTime(),
        subject: subjectInput.value.trim()
    }
    sessions.push(sessionData)
    localStorage.setItem('studySessions', JSON.stringify(sessions))
    localStorage.removeItem('studySessionActive')
    updateStatistics()
    renderSessionHistory()

    sessionContainer.querySelector('.timer-controls').remove()
    clock = 0
    startedAt = null
    timer.textContent = '00:00:00'
    subjectText.textContent = 'What are you studying today?'
    sessionContainer.appendChild(subjectInput)
    sessionContainer.appendChild(confirmButton)
    subjectInput.value = ''
}

updateStatistics()
renderSessionHistory()
restoreActiveSession()
