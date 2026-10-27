const newSessionLink = document.querySelector('.new-session')
const statisticsLink = document.querySelector('.statistics-link')
const sessionHistoryLink = document.querySelector('.session-history')

const timer = document.querySelector('.timer')
const subjectText = document.querySelector('.label')
const subjectInput = document.querySelector('.subject-input')
const confirmButton = document.querySelector('.confirm')

confirmButton.addEventListener('click', initialize)

function initialize () {
    replaceLabel()
}

function replaceLabel () {
    let subject = subjectInput.value
    subjectText.textContent = `Studying ${subject}...`
}