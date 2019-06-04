import Yeet from '../audio/yeet.mp3'

const yeet = new Audio(Yeet)
yeet.volume = 0.5
window.onload = () => yeet.play()
