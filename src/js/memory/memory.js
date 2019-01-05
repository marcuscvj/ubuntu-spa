import { Window } from '../window/window.js'
import template from './template.js'

export class Memory extends Window {
  constructor () {
    super()
    this.modalIcon.setAttribute('src', '/image/nav/memory.png')
    this.modalIcon.setAttribute('alt', 'Memory')
    this.modalBody.appendChild(template.content.cloneNode(true))

    this.rows = 4
    this.cols = 4
    this.tiles = this.getPictureArray(this.rows, this.cols)

    for (let i = 0; i < this.rows * this.cols; i++) {
      let img = document.createElement('img')
      img.setAttribute('src', '../../image/memory/0.png')
      this.modalBody.appendChild(img)

      if ((i + 1) % this.cols === 0) {
        let br = document.createElement('br')
        this.modalBody.appendChild(br)
      }
    }
  }

  getPictureArray (rows, cols) {
    let arr = []

    for (let i = 1; i <= (rows * cols) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }

    debugger
  }
}

window.customElements.define('memory-form', Memory)
