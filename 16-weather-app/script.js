const modeButton = document.querySelector('.settings-button')

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})