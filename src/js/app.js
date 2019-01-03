import { Window } from './window/window.js'
import { Chat } from './chat/chat.js'
import { Clock } from './clock/clock.js'

let apps = document.querySelector('#apps')

apps.addEventListener('click', event => {
  if (event.target.alt === 'chat') {
    let chat = document.createElement('chat-form')
    chat.setAttribute('title', 'Chat X')
    document.querySelector('#app-surface').appendChild(chat)
  } else if (event.target.alt === 'clock') {
    let clock = document.createElement('clock-form')
    clock.setAttribute('title', 'Clock')
    document.querySelector('#app-surface').appendChild(clock)
  } else if (event.target.alt === 'memory-game') {
    console.log('Clicked on Memory Game!')
  }
})
