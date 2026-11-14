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
    const selectedPassage = array[randomIndex]
    const fragment = document.createDocumentFragment()

    for (const character of selectedPassage) {
        const characterSpan = document.createElement('span')
        characterSpan.textContent = character
        fragment.append(characterSpan)
    }

    passage.replaceChildren(fragment)
}

function detectInput() {
    const currentInput = inputField.value
    const originalPassage = passage.textContent
    const characterSpans = passage.querySelectorAll('span')

    if (currentInput === originalPassage) {
        console.log('correct full passage!')
        fullPassageCorrect = true
        inputField.disabled = true
    } else {
        fullPassageCorrect = false
    }

    characterSpans.forEach((characterSpan, index) => {
        characterSpan.classList.remove('correct', 'incorrect', 'current')

        if (index < currentInput.length) {
            const className = currentInput[index] === characterSpan.textContent
                ? 'correct'
                : 'incorrect'
            characterSpan.classList.add(className)
        } else if (index === currentInput.length) {
            characterSpan.classList.add('current')
        }
    })
}

selectRandomPassage(passages)