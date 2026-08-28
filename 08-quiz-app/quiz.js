const hero = document.querySelector('.hero')
const heroHeading = document.querySelector('.hero-heading')
const playButton = document.querySelector('.play-button')

const questions = [
    {
        question: 'What does DOM stand for?',

        answers: [
            'Document Object Model',
            'Data Object Method',
            'Digital Order Manager',
            'Document Order Model'
        ],

        correctAnswer: 'Document Object Model'
    },

    {
        question: 'Which JavaScript method is used to select an element from the page?',

        answers: [
            'document.querySelector()',
            'document.createElement()',
            'document.appendChild()',
            'document.getText()'
        ],

        correctAnswer: 'document.querySelector()'
    },

    {
        question: 'What does the push() method do to an array?',

        answers: [
            'Adds an item to the end',
            'Removes the first item',
            'Sorts the array',
            'Returns the array length'
        ],

        correctAnswer: 'Adds an item to the end'
    },

    {
        question: 'What does addEventListener() allow you to do?',

        answers: [
            'Respond to events like clicks',
            'Create an array',
            'Style an HTML element',
            'Create a new JavaScript file'
        ],

        correctAnswer: 'Respond to events like clicks'
    }
]

function sectionClear () {
    heroHeading.remove()
    playButton.remove()
}

function displayQuestion (question) {
    const questionElement = document.createElement('h1')
    questionElement.textContent = question[0].question
    hero.appendChild(questionElement)
}

function gameStart () {
    sectionClear()
    displayQuestion(questions)
}

playButton.addEventListener('click', gameStart)