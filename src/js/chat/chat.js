import { Window } from '../window/window.js'
import { userInputForm, messageForm } from './template.js'

export class Chat extends Window {
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/chat.png')
    this.appIcon.setAttribute('alt', 'Chat')
    this.channel = undefined
    this.url = 'ws://vhost3.lnu.se:20080/socket/'

    if (window.localStorage.getItem('user')) {
      this.appBody.appendChild(messageForm.content.cloneNode(true))
    } else {
      this.appBody.appendChild(userInputForm.content.cloneNode(true))
    }

    const socket = new WebSocket(this.url)
    this.navigation = this.appBody.querySelector('.nav')
    this.selectChannel = this.appBody.querySelector('#select-channel')
    this.newUsername = this.appBody.querySelector('#new-username')

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)
      console.log(msg)

      if (msg.type === 'message' && msg.channel === this.channel) {
        let str = msg.username + ': ' + msg.data + '&#010;'
        this.appBody.querySelector('textarea').innerHTML += str
      }
    })

    this.navigation.addEventListener('click', event => {
      event.preventDefault()

      if (event.target.id === 'change-channel') {
        this.newUsername.hidden = true
        this.selectChannel.hidden = false
      } else if (event.target.id === 'change-username') {
        this.selectChannel.hidden = true
        this.newUsername.hidden = false
      }
    })

    this.newUsername.addEventListener('submit', event => {
      event.preventDefault()
      console.log(event.target)

      if (event.target.id === 'new-username') {
        let user = event.target.username.value
        console.log(user)
        window.localStorage.setItem('user', JSON.stringify({ username: user }))
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
