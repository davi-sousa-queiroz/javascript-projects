const eventInput = document.querySelector('.event-name')
const dateInput = document.querySelector('.event-date')
const addBtn = document.querySelector('.add-button')
const eventContainer = document.querySelector('.event-container')

eventContainer.replaceChildren()

addBtn.addEventListener('click', displayEvent)

function getEventName () {
    return eventInput.value.trim()
}

function getDate () {
    return dateInput.value
}

function createTargetDate () {
    return new Date(`${getDate()}T00:00:00`)
}

function getDaysLeft (targetDate) {
    const today = new Date()
    const todayInDays = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    const targetInDays = Date.UTC(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate()
    )

    return Math.round((targetInDays - todayInDays) / (24 * 60 * 60 * 1000))
}

function displayEvent (event) {
    event.preventDefault()

    const name = getEventName()
    const date = getDate()

    if (!name || !date) return

    const daysLeft = getDaysLeft(createTargetDate())
    const card = document.createElement('div')
    card.className = 'event-card'

    const cardText = document.createElement('div')
    cardText.className = 'card-text'

    const title = document.createElement('h2')
    title.className = 'added-event-name'
    title.textContent = name

    const dateParagraph = document.createElement('p')
    dateParagraph.className = 'added-event-date'
    dateParagraph.textContent = date

    cardText.append(title, dateParagraph)

    const daysContainer = document.createElement('div')
    daysContainer.className = 'days-remaining'

    const daysCount = document.createElement('p')
    daysCount.className = 'days'

    if (daysLeft < 0) {
        const daysAgo = Math.abs(daysLeft)
        daysCount.textContent = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`
        daysContainer.classList.add('is-past')
    } else if (daysLeft === 0) {
        daysCount.textContent = 'Today'
        daysContainer.classList.add('is-today')
    } else {
        daysCount.textContent = `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`
    }

    daysContainer.appendChild(daysCount)
    card.append(cardText, daysContainer)
    eventContainer.appendChild(card)

    eventInput.value = ''
    dateInput.value = ''
}
