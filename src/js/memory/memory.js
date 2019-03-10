/**
 * Memory module.
 *
 * @module src/js/memory/memory
 * @author Marcus Cvjeticanin
 * @version 1.3
 */

import Window from '../window/window.js'
import template from './template.js'

/**
 * A Memory application that inherits from Window.
 *
 * @class Memory
 * @extends {Window}
 */
export default class Memory extends Window {
  /**
   * Creates an instance of Memory.
   *
   * @memberof Memory
   */
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/memory.png')
    this.appIcon.setAttribute('alt', 'Memory')
    this.appBody.appendChild(template.content.cloneNode(true))
    this.resultsDiv = this.appBody.querySelector('#results')
    this.resultsDiv.setAttribute('class', 'alert alert-light')
    this.resultsDiv.innerHTML = 'Number of tries: '

    this.rows = 4
    this.cols = 4
    this.tiles = this.getPictureArray(this.rows, this.cols)
    this.bricks = this.appBody.querySelector('#bricks')

    this.turn1 = undefined
    this.turn2 = undefined
    this.lastTile = undefined
    this.pairs = 0
    this.tries = 0

    this.tiles.forEach((tile, index) => {
      let aTag = document.createElement('a')
      aTag.setAttribute('href', '#')
      aTag.setAttribute('tabindex', index + 1)
      this.bricks.appendChild(aTag)

      let img = document.createElement('img')
      img.setAttribute('src', '../../image/memory/0.png')
      aTag.appendChild(img)

      aTag.addEventListener('click', event => {
        event.preventDefault()
        let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
        this.turnBrick(tile, index, img)
      })

      if ((index + 1) % this.cols === 0) {
        let br = document.createElement('br')
        this.bricks.appendChild(br)
      }
    })
  }

  /**
   * Turns the brick in the Memory game.
   *
   * @memberof Memory
   */
  turnBrick (tile, index, img) {
    img.src = '../../image/memory/' + tile + '.png'

    if (this.turn2) {
      return
    }

    if (!this.turn1) {
      // First brick is clicked
      this.turn1 = img
      this.lastTile = tile
    } else {
      // Second brick is clicked
      if (img === this.turn1) {
        return
      }

      this.tries++
      this.resultsDiv.innerHTML = 'Number of tries: ' + this.tries
      this.turn2 = img

      if (tile === this.lastTile) {
        // Found a pair
        this.pairs++

        if (this.pairs === (this.cols * this.rows) / 2) {
          this.bricks.innerHTML = ''
          this.resultsDiv.setAttribute('class', 'alert alert-success')
          this.resultsDiv.innerHTML = 'You won on ' + this.tries + ' tries!'
        }

        window.setTimeout(() => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')
          this.turn1 = undefined
          this.turn2 = undefined
        }, 300)
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

  /**
   * Creates the bricks and shuffles it.
   *
   * @memberof Memory
   */
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
