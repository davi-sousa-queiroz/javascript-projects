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
            const question2Element = displayQuestion2(question)
            displayAnswers2(question, question2Element)
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

    return question2
}

function displayAnswers2 (question, questionElement) {
    function answerIncorrect () {
        questionElement.textContent = 'That is Incorrect!'
    }
    function answerCorrect () {
        questionElement.textContent = 'That is Correct!'
        points++
    }
    function reveal () {
        answer1B.style.backgroundColor = 'green'
        answer2B.style.backgroundColor = 'red'
        answer3B.style.backgroundColor = 'red'
        answer4B.style.backgroundColor = 'red'
        answer1B.style.color = 'white'
        answer2B.style.color = 'white'
        answer3B.style.color = 'white'
        answer4B.style.color = 'white'
        const nextButton = document.createElement('button')
        nextButton.textContent = 'NEXT'
        nextButton.className = 'next-button'
        hero.appendChild(nextButton)
        nextButton.addEventListener('click', function () {
            hero.innerHTML = ''
        })
    }
    const answer1B = document.createElement('button')
    const answer2B = document.createElement('button')
    const answer3B = document.createElement('button')
    const answer4B = document.createElement('button')

    answer1B.className = 'answer-button'
    answer2B.className = 'answer-button'
    answer3B.className = 'answer-button'
    answer4B.className = 'answer-button'

    answer1B.textContent = question[1].answers[0]
    answer1B.addEventListener('click', answerCorrect)
    answer1B.addEventListener('click', reveal)
    hero.appendChild(answer1B)

    answer2B.textContent = question[1].answers[1]
    answer2B.addEventListener('click', answerIncorrect)
    answer2B.addEventListener('click', reveal)
    hero.appendChild(answer2B)

    answer3B.textContent = question[1].answers[2]
    answer3B.addEventListener('click', answerIncorrect)
    answer3B.addEventListener('click', reveal)
    hero.appendChild(answer3B)

    answer4B.textContent = question[1].answers[3]
    answer4B.addEventListener('click', answerIncorrect)
    answer4B.addEventListener('click', reveal)
    hero.appendChild(answer4B)
}

function gameStart () {
    points = 0
    sectionClear()
    const questionElement = displayQuestion(questions)
    displayAnswers(questions, questionElement)
}

playButton.addEventListener('click', gameStart)