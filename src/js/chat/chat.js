import { Window } from '../window/window.js'

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
<form id="message-form" autocomplete="off">
<div class="form-group">
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" readonly></textarea>
</div>
<div class="form-group">
  <input class="form-control" type="text" name="message" placeholder="Send a message">
</div>
</form>
`

export class Chat extends Window {
  constructor () {
    super()
    this.modalIcon.setAttribute('src', '/image/nav/chat.png')
    this.modalIcon.setAttribute('alt', 'Chat')
    this.username = undefined
    this.url = 'ws://vhost3.lnu.se:20080/socket/'

    // if chat-form does not exists in DOM
    if (!document.querySelector('chat-form')) {
      this.modalBody.appendChild(inputForm.content.cloneNode(true))
    } else {
      this.modalBody.appendChild(messageForm.content.cloneNode(true))
    }

    const socket = new WebSocket(this.url)

    socket.addEventListener('message', event => {
      let msg = JSON.parse(event.data)
      console.log(msg)
      
      if (msg.type === 'message') {
        let str = msg.username + ': ' + msg.data + ''
        this.modalBody.querySelector('textarea').value += str
      }
    })

    this.modalBody.addEventListener('submit', event => {
      event.preventDefault()

      if (event.target.id === 'username-form') {
        this.username = event.target.username.value
        this.clearWindow()
        this.modalBody.appendChild(messageForm.content.cloneNode(true))
      } else {
        let msg = event.target.message.value

        let sendObj = {
          type: 'message',
          data: msg,
          username: this.username,
          channel: 'other',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }

        socket.send(JSON.stringify(sendObj))
        this.modalBody.querySelector('input').value = ''
      }
    })
  }
}

window.customElements.define('chat-form', Chat)
