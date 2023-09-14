const navBtn = document.querySelector('header>button')
const nav = document.querySelector('.navList')
const { classList } = nav

window.onresize = () => setNavState()
window.onload = () => setNavState()
navBtn.onclick = () => classList.toggle('navClose')
window.location.hash = ''
history.scrollRestoration = 'manual'

const setNavState = () => window.innerWidth > 375
    ? classList.remove('navClose') : classList.add('navClose')