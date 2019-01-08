import { Window } from './window/window.js'
// import { Chat } from './chat/chat.js'
// import { Clock } from './clock/clock.js'
// import { Memory } from './memory/memory.js'
import displayCurrentTime from './time.js'

let apps = document.querySelector('#apps')
let time = document.querySelector('#display-current-time')

displayCurrentTime(time)

/* apps.addEventListener('click', event => {
  if (event.target.alt === 'chat') {
    let chat = document.createElement('chat-form')
    chat.setAttribute('title', 'Chat X')
    document.querySelector('#surface').appendChild(chat)
  } else if (event.target.alt === 'clock') {
    let clock = document.createElement('clock-form')
    clock.setAttribute('title', 'Clock')
    document.querySelector('#surface').appendChild(clock)
  } else if (event.target.alt === 'memory-game') {
    let memory = document.createElement('memory-form')
    memory.setAttribute('title', 'Memory Game')
    document.querySelector('#surface').appendChild(memory)
  }
}) */

apps.addEventListener('click', event => {
  if (event.target.alt === 'chat') {
    let window = document.createElement('window-form')
    window.setAttribute('title', 'Window Test')
    document.querySelector('#surface').appendChild(window)
  }
})
