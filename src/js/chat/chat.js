import { Window } from '../window/window.js'
import { userInputForm, messageForm } from './template.js'

export class Chat extends Window {
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/chat.png')
    this.appIcon.setAttribute('alt', 'Chat')
    this.channel = undefined
    this.url = 'ws://vhost3.lnu.se:20080/socket/'

    // if chat-form does not exists in DOM
    if (!document.querySelector('chat-form')) {
      this.appBody.appendChild(userInputForm.content.cloneNode(true))
    } else if (window.localStorage.getItem('user')) {
      this.appBody.appendChild(messageForm.content.cloneNode(true))
    } else {
      this.appBody.appendChild(userInputForm.content.cloneNode(true))
    }

    const socket = new WebSocket(this.url)

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)

      if (msg.type === 'message' && msg.channel === this.channel) {
        let str = msg.username + ': ' + msg.data + '&#010;'
        this.appBody.querySelector('textarea').innerHTML += str
      }
    })

    this.appBody.addEventListener('input', event => {
      event.preventDefault()

      if (event.target.name === 'channel') {
        this.channel = event.target.value
      }
    })

    this.appBody.addEventListener('submit', event => {
      event.preventDefault()

      if (event.target.id === 'username-form') {
        let user = event.target.username.value
        window.localStorage.setItem('user', JSON.stringify({ username: user }))

        this.clearWindow()
        this.appBody.appendChild(messageForm.content.cloneNode(true))
      } else {
        let msg = event.target.message.value
        let user = JSON.parse(window.localStorage.getItem('user'))

        let sendObj = {
          type: 'message',
          data: msg,
          username: user.username,
          channel: this.channel,
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }

        socket.send(JSON.stringify(sendObj))
        this.appBody.querySelector('#message').value = ''
      }
    })

    // Event listeners to close the socket when the user closes the window
    /*  this.modalCloseBtn.addEventListener('click', event => {
      socket.close()
    }) */

    this.appFooterCloseBtn.addEventListener('click', event => {
      socket.close()
    })
  }
}

window.customElements.define('chat-form', Chat)
