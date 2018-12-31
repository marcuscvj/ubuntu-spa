import { Window } from './window/window.js'
import { Chat } from './chat/chat.js'

let apps = document.querySelector('#apps')

apps.addEventListener('click', event => {
  if (event.target.alt === 'chat') {
    /* let chat = document.createElement('window-form')
    chat.setAttribute('title', 'Chat X')
    document.querySelector('#app-surface').appendChild(chat) */
    let chat = document.createElement('chat-form')
    chat.setAttribute('title', 'Chat X')
    document.querySelector('#app-surface').appendChild(chat)
  } else if (event.target.alt === 'stopwatch') {
    console.log('Clicked on stopwatch!')
  } else if (event.target.alt === 'memory-game') {
    console.log('Clicked on Memory Game!')
  }
})
