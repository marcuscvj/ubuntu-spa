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
<form>
<div class="form-group">
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="8" readonly></textarea>
</div>
<div class="form-group">
  <input id="input1" class="form-control" type="text" placeholder="Send a message">
</div>
</form>
`

export class Chat extends Window {
  constructor () {
    super()
    this.username = undefined
    this.modalIcon.setAttribute('src', '/image/nav/chat.png')
    this.modalIcon.setAttribute('alt', 'Chat')
    this.modalBody.appendChild(inputForm.content.cloneNode(true))
    this.url = 'ws://vhost3.lnu.se:20080/socket/'

    this.modalBody.addEventListener('submit', event => {
      event.preventDefault()
      this.username = event.target.username.value
      this.clearWindow()

      this.modalBody.appendChild(messageForm.content.cloneNode(true))
    })
  }

  start (objData) {
    const connection = new WebSocket(this.url)

    connection.onopen = () => {
      connection.send(objData)
    }

    connection.onmessage = e => {
      console.log(e.data)
    }

    connection.onerror = error => {
      console.error(`WebSocket error: ${error}`)
    }
  }
}

window.customElements.define('chat-form', Chat)
