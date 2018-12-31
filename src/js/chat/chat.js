import { Window } from '../window/window.js'

let inputForm = `
<form>
  <div class="form-group">
    <label for="inputUsername">Username</label>
    <input type="text" class="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username">
    <small id="usernameHelp" class="form-text text-muted">To be able to use the chat you must enter a username.</small>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`
export class Chat extends Window {
  constructor () {
    super()
    this.username = ''
    this.modalIcon.setAttribute('src', '/image/nav/chat.png')
    this.modalIcon.setAttribute('alt', 'Chat')
    this.modalBody.innerHTML = inputForm
  }
}

window.customElements.define('chat-form', Chat)
