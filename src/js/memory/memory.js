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
    this.bricks = this.modalBody.querySelector('#bricks')

    this.turn1 = undefined
    this.turn2 = undefined

    this.tiles.forEach((tile, index) => {
      let aTag = document.createElement('a')
      aTag.setAttribute('href', '#')
      this.bricks.appendChild(aTag)

      let img = document.createElement('img')
      img.setAttribute('src', '../../image/memory/0.png')
      aTag.appendChild(img)

      img.addEventListener('click', event => {
        let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
        this.turnBrick(tile, index, img)
      })

      if ((index + 1) % this.cols === 0) {
        let br = document.createElement('br')
        this.bricks.appendChild(br)
      }
    })
  }

  turnBrick (tile, index, img) {
    img.src = '../../image/memory/' + tile + '.png'

    this.turn1 = img

    if (!this.turn1) {
      // First brick is clicked
      
    } else {
      // Second brick is clicked
    }
  }

  getPictureArray (rows, cols) {
    let arr = []

    for (let i = 1; i <= (rows * cols) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    return arr
  }
}

window.customElements.define('memory-form', Memory)
