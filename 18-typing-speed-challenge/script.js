const passage = document.querySelector('.passage')
const inputField = document.querySelector('.input-field')

let fullPassageCorrect = false

inputField.addEventListener('input', detectInput)

const passages = [
    'the cat fell really far down',
    'there are some shoes in that closet',
    'english is the most spoken language in the world'
]

function selectRandomPassage(array) {
    const arrayLength = array.length
    const randomIndex = Math.floor(Math.random() * arrayLength)
    passage.textContent = array[randomIndex]
}

function detectInput() {
    const currentInput = inputField.value
    const originalPassage = passage.textContent

    if (currentInput === originalPassage) {
        console.log('correct full passage!')
        fullPassageCorrect = true
    } else {
        fullPassageCorrect = false
    }

    for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === originalPassage[i]) {
            console.log('current correct!')
        } else {
            console.log('current wrong..')
        }
    }
}

selectRandomPassage(passages)