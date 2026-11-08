const modeButton = document.querySelector('.settings-button')
const humidity = document.querySelector('.amount')
const input = document.querySelector('.search-container input')
const searchButton = document.querySelector('.search-button')
const temperature = document.querySelector('.temp')
const weatherEmoji = document.querySelector('.emoji')
const locationInfo = document.querySelector('.location')
const condition = document.querySelector('.condition')

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})