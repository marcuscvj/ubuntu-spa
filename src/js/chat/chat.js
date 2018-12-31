import { Window } from '../window/window.js'

export class Chat extends Window {
  constructor () {
    super()
    this.modalBody = 'Test'
  }
}

window.customElements.define('chat-form', Chat)
