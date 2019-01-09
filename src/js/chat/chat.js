/**
 * Chat module.
 *
 * @module src/js/chat/chat
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

import { Window } from '../window/window.js'
import { template, defaultStyle, settingsStyle } from './template.js'

/**
 * A Chat application that inherits from Window.
 *
 * @class Chat
 * @extends {Window}
 */
export class Chat extends Window {
  /**
   * Creates an instance of Chat.
   *
   * @memberof Chat
   */
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/chat.png')
    this.appIcon.setAttribute('alt', 'Chat')
    this.channel = undefined
    this.url = 'ws://vhost3.lnu.se:20080/socket/'
    this.appBody.appendChild(defaultStyle.content.cloneNode(true))
    this.appBody.appendChild(template.content.cloneNode(true))
    this.navigation = this.appBody.querySelector('.nav')
    this.selectChannel = this.appBody.querySelector('#select-channel')
    this.newUsername = this.appBody.querySelector('#new-username')
    this.chatSettings = this.appBody.querySelector('#settings')

    if (window.localStorage.getItem('settings')) {
      let settings = JSON.parse(window.localStorage.getItem('settings'))
      if (settings.theme === 'dark-theme') {
        this.app.appendChild(settingsStyle.content.cloneNode(true))
        this.appBody.querySelector('#dark-theme').checked = true
      }
    }

    if (!window.localStorage.getItem('user')) {
      this.appBody.querySelector('#username-form').hidden = false
    } else {
      this.appBody.querySelector('#username-form').hidden = true
      this.appBody.querySelector('#message-form').hidden = false
      this.appBody.querySelector('.nav').hidden = false
    }

    const socket = new WebSocket(this.url)

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)

      if (msg.username === '') {
        msg.username = 'Anonymous'
      }

      if (msg.type === 'message' && msg.channel === this.channel) {
        let time = '<span id="message-time">' + this.getDate() + '</span>'
        let str = '<div class="message"><b>' + msg.username + ':</b> ' + msg.data + ' ' + time + '</div>'
        this.appBody.querySelector('.messages').innerHTML += str
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

        this.appBody.querySelector('#username-form').hidden = true
        this.appBody.querySelector('#message-form').hidden = false
        this.appBody.querySelector('.nav').hidden = false
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

    this.chatSettings.addEventListener('change', event => {
      if (event.target.checked) {
        let theme = 'dark-theme'
        window.localStorage.setItem('settings', JSON.stringify({ theme: theme }))
        this.app.appendChild(settingsStyle.content.cloneNode(true))
      } else {
        let appDiv = this.shadowRoot.querySelector('#app')
        let styles = appDiv.querySelectorAll('style')

        for (let i = 0; i < styles.length; i++) {
          styles[i].remove()
        }

        this.appBody.appendChild(defaultStyle.content.cloneNode(true))
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
      }
    })

    this.appHeaderCloseBtn.addEventListener('click', event => {
      socket.close()
    })

    this.appFooterCloseBtn.addEventListener('click', event => {
      socket.close()
    })
  }

  /**
   * Returns the current date in format
   * YYYY-MM-DD HH:MM:SS
   *
   * @memberof Chat
   * @returns {String}
   */
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
