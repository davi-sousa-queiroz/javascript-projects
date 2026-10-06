const no = document.querySelector('.no')
const yes = document.querySelector('.yes')
const gif = document.querySelector('.gif')
const question = document.querySelector('.question')
const restart = document.querySelector('.restart')

yes.addEventListener('click', function () {
    gif.style.backgroundImage = "url('assets/wedding.gif')"
    question.textContent = 'EU TE AMO ❤️💍'
    restart.hidden = false
})

restart.addEventListener('click', function () {
    gif.style.backgroundImage = ''
    question.textContent = '💐 QUER CASAR CMG?'
    no.classList.remove('troll-mode')
    restart.hidden = true
})

function troll () {
    no.classList.toggle('troll-mode')
    playNoSound()
}

no.addEventListener('click', troll)