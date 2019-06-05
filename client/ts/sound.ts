import Clunk from '../audio/clunk.wav'
import Yeet from '../audio/yeet.mp3'

const yeet = new Audio(Yeet)
yeet.volume = 0.2
yeet.loop = true

window.onload = () => yeet.play()

export const playClunk = () => {
  const clunk = new Audio(Clunk)

  clunk.volume = 0.7
  clunk.play()
}
