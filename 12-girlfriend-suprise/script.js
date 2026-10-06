const no = document.querySelector('.no')

function troll () {
    no.classList.toggle('troll-mode')
    playNoSound()
}

no.addEventListener('click', troll)