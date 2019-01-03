import { Window } from '../window/window.js'

export class Clock extends Window {
  constructor () {
    super()
    this.modalIcon.setAttribute('src', '/image/nav/clock.png')
    this.modalIcon.setAttribute('alt', 'Clock')
  }
}

window.customElements.define('clock-form', Clock)