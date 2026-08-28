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
    }
]

function gameStart () {

}

playButton.addEventListener('click', gameStart)