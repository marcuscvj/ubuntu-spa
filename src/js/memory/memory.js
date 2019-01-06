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
    this.lastTile = undefined

    this.tiles.forEach((tile, index) => {
      let aTag = document.createElement('a')
      aTag.setAttribute('href', '#')
      this.bricks.appendChild(aTag)

      let img = document.createElement('img')
      img.setAttribute('src', '../../image/memory/0.png')
      aTag.appendChild(img)

      aTag.addEventListener('click', event => {
        let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
        console.log(event.target.nodeName)
        console.log(event.target)
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

    if (!this.turn1) {
      // First brick is clicked
      this.turn1 = img
      this.lastTile = tile
    } else {
      // Second brick is clicked

      /* if (img === this.turn1) {
        return
      } */
      this.turn2 = img

      if (tile === this.lastTile) {
        console.log('Pair!')

        window.setTimeout(() => {
          this.turn1.classList.add('removed')
          this.turn2.classList.add('removed')
          this.turn1 = undefined
          this.turn2 = undefined
        }, 100)
      } else {
        window.setTimeout(() => {
          this.turn1.src = '../../image/memory/0.png'
          this.turn2.src = '../../image/memory/0.png'
          this.turn1 = undefined
          this.turn2 = undefined
        }, 500)
      }
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
