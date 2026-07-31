// FUNCTIONS //

function generate () {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
}

function compare (guess, randomNumber) {
    if (guess === randomNumber) {
        alert('You win!')
    } else if (guess > randomNumber) {
        alert('Guess Lower!')
    } else {
        alert('Guess Higher!')
    }
}

function getGuess () {
    const guess = Number(document.querySelector('.js-input').value)
    compare(guess, randomNumber)
}

// LOGIC 🥵//

const randomNumber = generate();