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

    this.tiles.forEach((tile, index) => {
      let aTag = document.createElement('a')
      aTag.setAttribute('src', '#')
      this.bricks.appendChild(aTag)

      let img = document.createElement('img')
      img.setAttribute('src', '../../image/memory/0.png')
      aTag.appendChild(img)

      img.addEventListener('click', event => {
        console.log(index)
        this.turnBrick(tile, index, img)
      })

      if ((index + 1) % this.cols === 0) {
        let br = document.createElement('br')
        this.bricks.appendChild(br)
      }
    })
  }

  turnBrick (tile, index, element) {
    let img = element.nodeName === 'IMG' ? element : element.firstElementChild
    img.src = '../../image/memory/' + tile + '.png'
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
