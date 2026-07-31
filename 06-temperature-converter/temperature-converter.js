//GET TEMPURATURE IN CELSIUS

function getCelsius () {
    let tempC = document.querySelector('.celsius').value
    return tempC;
}

//CONVERT TEMPERATURE

function convert (temp) {
    let converted = temp * 1.8 + 32
    return converted;
}

//DISPLAY IN FAHRENHEIT

function displayF (temp) {
    let displayPort = document.querySelector('.result')
    displayPort.textContent = Number(temp).toFixed(1)
}

// OPTIONAL RESET //

function reset () {
    document.querySelector('.celsius').value = ''
    document.querySelector('.result').textContent = ''
}

// CONVERT SWAP //

// FAHRENHEIT TO CELSIUS //

function getFahrenheit () {
    let tempF = document.querySelector('.fahrenheit-ui').value
    return tempF;
}

// CONVERT TEMPERATURE //

function convertFC (temp) {
    tempC  = (temp - 32) * 5/9
    return tempC;
}

// DISPLAY IN CELSIUS //

function displayC (temp) {
    let newCelsiusPort = document.querySelector('.result-box-alt')
    newCelsiusPort.textContent = Number(temp).toFixed(1)
}

// OPTIONAL RESET //

function reset2 () {
    document.querySelector('.fahrenheit-ui').value = ''
    document.querySelector('.result-box-alt').textContent = ''
}

// LIGHT AND DARK MODES //

function lightModeTransfer () {
    document.body.style.backgroundColor = 'white'
}

function darkModeTransfer () {
    document.body.style.backgroundColor = 'black'
}

function randomMode () {
    selector = Math.random()
    if (selector > 0.9) {
        document.body.style.backgroundColor = 'red'
    } else if (selector > 0.8) {
        document.body.style.backgroundColor = 'orange'
    } else if (selector > 0.7) {
        document.body.style.backgroundColor = 'yellow'
    } else if (selector > 0.6) {
        document.body.style.backgroundColor = 'green'
    } else if (selector > 0.5) {
        document.body.style.backgroundColor = 'blue'
    } else if (selector > 0.4) {
        document.body.style.backgroundColor = 'purple'
    } else if (selector > 0.3) {
        document.body.style.backgroundColor = 'magenta'
    } else if (selector > 0.2) {
        document.body.style.backgroundColor = 'black'
    } else if (selector > 0.1) {
        document.body.style.backgroundColor = 'white'
    } else {
        document.body.style.backgroundColor = 'dark purple'
    }
}

function resetAll () {
    document.querySelector('.celsius').value = ''
    document.querySelector('.result').textContent = ''

    document.querySelector('.fahrenheit-ui').value = ''
    document.querySelector('.result-box-alt').textContent = ''
}

lightModeTransfer();