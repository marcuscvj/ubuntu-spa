import { Window } from '../window/window.js'
// import { WebSocket } from 'websocket'

const inputForm = document.createElement('template')
inputForm.innerHTML = `
<form id="username-form">
  <div class="form-group">
    <label for="inputUsername">Username</label>
    <input type="text" class="form-control" id="inputUsername" name="username" aria-describedby="usernameHelp" placeholder="Enter username">
    <small id="usernameHelp" class="form-text text-muted">To be able to use the chat you must enter a username.</small>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

const messageForm = document.createElement('template')
messageForm.innerHTML = `
<style>
  .form-control {
    overflow-y: scroll;
  }
</style>
<div id="select-channel" class="form-group">
  <div class="input-group">
    <div class="input-group-prepend">
    <div class="input-group-text">#</div>
    </div>
    <input type="text" class="form-control" name="channel" placeholder="channel">
  </div>
</div>
<form id="message-form" autocomplete="off">
  <div class="form-group">
    <textarea class="form-control" rows="8" readonly></textarea>
  </div>
  <div class="form-group">
    <textarea id="message" class="form-control" name="message" rows="2" placeholder="Send a message"></textarea>
  </div>
  <button class="btn btn-primary" type="submit">Send</button>
</form>
`

export class Chat extends Window {
  constructor () {
    super()
    this.modalIcon.setAttribute('src', '/image/nav/chat.png')
    this.modalIcon.setAttribute('alt', 'Chat')
    this.channel = undefined
    this.url = 'ws://vhost3.lnu.se:20080/socket/'

    // if chat-form does not exists in DOM
    if (!document.querySelector('chat-form')) {
      this.modalBody.appendChild(inputForm.content.cloneNode(true))
    } else if (window.localStorage.getItem('user')) {
      this.modalBody.appendChild(messageForm.content.cloneNode(true))
    } else {
      this.modalBody.appendChild(inputForm.content.cloneNode(true))
    }

    const socket = new WebSocket(this.url)

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)
      console.log(msg) // TA BORT SENARE

      if (msg.type === 'message' && msg.channel === this.channel) {
        let str = msg.username + ': ' + msg.data + '&#010;'
        this.modalBody.querySelector('textarea').innerHTML += str
      }
    })

    this.modalBody.addEventListener('input', event => {
      event.preventDefault()

      if (event.target.name === 'channel') {
        this.channel = event.target.value
      }
    })

    this.modalBody.addEventListener('submit', event => {
      event.preventDefault()

      if (event.target.id === 'username-form') {
        let user = event.target.username.value
        window.localStorage.setItem('user', JSON.stringify({ username: user }))

        this.clearWindow()
        this.modalBody.appendChild(messageForm.content.cloneNode(true))
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
        this.modalBody.querySelector('#message').value = ''
      }
    })

    // Event listeners to close the socket when the user closes the window
    this.modalCloseBtn.addEventListener('click', event => {
      socket.close()
    })

    this.modalFooterCloseBtn.addEventListener('click', event => {
      socket.close()
    })
  }
}

window.customElements.define('chat-form', Chat)
