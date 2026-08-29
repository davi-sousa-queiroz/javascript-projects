const hero = document.querySelector('.hero')
const heroHeading = document.querySelector('.hero-heading')
const playButton = document.querySelector('.play-button')
let points = 0

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
    questionElement.className = 'question-heading'
    questionElement.textContent = question[0].question
    hero.appendChild(questionElement)

    return questionElement
}

function displayAnswers (question, questionElement) {
    function answerIncorrect () {
        questionElement.textContent = 'That is Incorrect!'
    }
    function answerCorrect () {
        questionElement.textContent = 'That is Correct!'
        points++
    }
    function reveal () {
        answer1.style.backgroundColor = 'green'
        answer2.style.backgroundColor = 'red'
        answer3.style.backgroundColor = 'red'
        answer4.style.backgroundColor = 'red'
        answer1.style.color = 'white'
        answer2.style.color = 'white'
        answer3.style.color = 'white'
        answer4.style.color = 'white'
        const nextButton = document.createElement('button')
        nextButton.textContent = 'NEXT'
        nextButton.className = 'next-button'
        hero.appendChild(nextButton)
        nextButton.addEventListener('click', function () {
            hero.innerHTML = ''
            displayQuestion2(question);
        })
    }
    const answer1 = document.createElement('button')
    const answer2 = document.createElement('button')
    const answer3 = document.createElement('button')
    const answer4 = document.createElement('button')
    answer1.className = 'answer-button'
    answer2.className = 'answer-button'
    answer3.className = 'answer-button'
    answer4.className = 'answer-button'
    answer1.textContent = question[0].answers[0]
    hero.appendChild(answer1)
    answer1.addEventListener('click', answerCorrect)
    answer1.addEventListener('click', reveal)
    answer2.textContent = question[0].answers[1]
    answer2.addEventListener('click', answerIncorrect)
    answer2.addEventListener('click', reveal)
    hero.appendChild(answer2)
    answer3.textContent = question[0].answers[2]
    answer3.addEventListener('click', answerIncorrect)
    answer3.addEventListener('click', reveal)
    hero.appendChild(answer3)
    answer4.textContent = question[0].answers[3]
    answer4.addEventListener('click', answerIncorrect)
    answer4.addEventListener('click', reveal)
    hero.appendChild(answer4)
}

function displayQuestion2 (question) {
    const question2 = document.createElement('h1')
    question2.className = 'question-heading'
    question2.textContent = question[1].question
    hero.appendChild(question2)
}

function gameStart () {
    points = 0
    sectionClear()
    const questionElement = displayQuestion(questions)
    displayAnswers(questions, questionElement)
}

playButton.addEventListener('click', gameStart)