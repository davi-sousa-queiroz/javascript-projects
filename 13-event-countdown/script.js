const eventInput = document.querySelector('.event-name')
const dateInput = document.querySelector('.event-date')
const addBtn = document.querySelector('.add-button')
const eventContainer = document.querySelector('.event-container')

eventContainer.replaceChildren()

addBtn.addEventListener('click', displayEvent)

function getEventName () {
    return eventInput.value
}

function getDate () {
    return dateInput.value
}

function displayEvent() {
    const name = getEventName();
    const date = getDate();

    if (!name || !date) return;

    const card = document.createElement('div');
    card.className = 'event-card';

    const cardText = document.createElement('div');
    cardText.className = 'card-text';

    const title = document.createElement('h2');
    title.className = 'added-event-name';
    title.textContent = name;

    const dateParagraph = document.createElement('p');
    dateParagraph.className = 'added-event-date';
    dateParagraph.textContent = date;

    cardText.appendChild(title);
    cardText.appendChild(dateParagraph);

    const daysContainer = document.createElement('div');
    daysContainer.className = 'days-remaining';

    const daysCount = document.createElement('p');
    daysCount.className = 'days';
    daysCount.textContent = '99';
    
    daysContainer.appendChild(daysCount);
    card.appendChild(cardText);
    card.appendChild(daysContainer);
    eventContainer.appendChild(card);

    eventInput.value = '';
    dateInput.value = '';
}