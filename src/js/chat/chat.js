import { Window } from '../window/window.js'
import { userInputForm, messageForm, settingsStyle } from './template.js'

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
    this.chatSettings = this.appBody.querySelector('#settings')

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)

      if (msg.type === 'message' && msg.channel === this.channel) {
        let time = '<span id="message-time">' + this.getDate() + '</span>'
        let str = '<div class="message"><b>' + msg.username + ':</b> ' + msg.data + ' ' + time + '</div>'
        this.appBody.querySelector('.messages').innerHTML += str
      }
    })

    this.navigation.addEventListener('click', event => {
      event.preventDefault()

      if (event.target.id === 'change-channel') {
        this.chatSettings.hidden = true
        this.newUsername.hidden = true
        this.selectChannel.hidden = false
      } else if (event.target.id === 'change-username') {
        this.chatSettings.hidden = true
        this.selectChannel.hidden = true
        this.newUsername.hidden = false
      } else if (event.target.id === 'chat-settings') {
        this.selectChannel.hidden = true
        this.newUsername.hidden = true
        this.chatSettings.hidden = false
        console.log('testing')
      }
    })

    this.chatSettings.addEventListener('change', event => {
      if (event.target.checked) {
        this.app.appendChild(settingsStyle.content.cloneNode(true))
        console.log('checked!')
      } else {
        console.log('unchecked')
      }
    })

    this.newUsername.addEventListener('submit', event => {
      event.preventDefault()

      if (event.target.id === 'new-username') {
        let user = event.target.username.value
        if (user !== '') {
          window.localStorage.setItem('user', JSON.stringify({ username: user }))
        }
        this.newUsername.hidden = true
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
      } else if (event.target.id === 'message-form') {
        if (event.target.message.value !== undefined) {
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
      }
    })

    // Event listeners to close the socket when the user closes the window
    this.appHeaderCloseBtn.addEventListener('click', event => {
      socket.close()
    })

    this.appFooterCloseBtn.addEventListener('click', event => {
      socket.close()
    })
  }

  getDate () {
    let d = new Date()

    function formatDate (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }

    let str = (
      d.getFullYear() + '-' + formatDate(d.getMonth() + 1) + '-' +
      formatDate(d.getDate()) + ' ' + formatDate(d.getHours()) +
      ':' + formatDate(d.getMinutes()) + ':' + formatDate(d.getSeconds())
    )

    return str
  }
}

window.customElements.define('chat-form', Chat)
