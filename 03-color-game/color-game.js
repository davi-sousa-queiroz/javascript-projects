let colorClick = 0

function addColorClick () {
    colorClick += 1
    const countItem = document.querySelector('.click-count')
    countItem.textContent = `Color Change Count: ${colorClick}`
}

function colorChange (color) {
    document.body.style.backgroundColor = color

}

function textChange (color) {
    const text = document.querySelector('.js-text')
    text.textContent = `The background color is now ${color}!`
}

function textReset () {
    colorClick = 0
    const text = document.querySelector('.js-text')
    text.textContent = ''
    const count = document.querySelector('.click-count')
    count.textContent = ''
}