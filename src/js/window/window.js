/**
 * Window module.
 *
 * @module src/js/window/window
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

import template from './template.js'

/**
 * A basic Window element that other app elements inherts from.
 *
 * @class Window
 * @extends {window.HTMLElement}
 */
export class Window extends window.HTMLElement {
  /**
   * Creates an instance of Window.
   *
   * @memberof Window
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.appCurrent = document.querySelector('.navbar-current-app')
    this.titleText = 'Window Object'
    this.container = this.shadowRoot.querySelector('#container')
    this.app = this.shadowRoot.querySelector('#app')
    this.appContent = this.shadowRoot.querySelector('.app-container')
    this.appHeader = this.shadowRoot.querySelector('.app-header')
    this.appTitle = this.shadowRoot.querySelector('.app-title')
    this.appBody = this.shadowRoot.querySelector('.app-body')
    this.appHeaderCloseBtn = this.shadowRoot.querySelector('.close')
    this.appFooterCloseBtn = this.shadowRoot.querySelector('.app-close-btn')
    this.appIcon = this.shadowRoot.querySelector('.app-icon')

    this.active = false
    this.currentX = undefined
    this.currentY = undefined
    this.initialX = undefined
    this.initialY = undefined
    this.offsetX = 0
    this.offsetY = 0
  }

  /**
   * Static method that gets specific attributes from the element.
   *
   * @memberof Window
   * @static
   */
  static get observedAttributes () {
    return ['title']
  }

  /**
   * Called when connected to the DOM
   *
   * @memberof Window
   */
  connectedCallback () {
    this.appTitle.textContent = this.titleText

    this.appFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.appHeaderCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.app.addEventListener('mousedown', event => {
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY

      if (event.target === this.appHeader) {
        this.app.classList.remove('app-focused')
        this.active = true

        let appTitle = event.target.querySelector('.app-title')
        if (appTitle.textContent !== null) {
          this.appCurrent.textContent = appTitle.textContent
        }
      }
    })

    this.app.addEventListener('mouseup', event => {
      this.initialX = this.currentX
      this.initialY = this.currentY

      this.app.classList.remove('app-focused')
      this.active = false
    })

    this.app.addEventListener('mousemove', event => {
      if (this.active) {
        event.preventDefault()

        this.currentX = event.clientX - this.initialX
        this.currentY = event.clientY - this.initialY

        this.app.classList.add('app-focused')

        let worker = new Worker('./js/window/worker.js')

        let coordinates = {
          currentX: this.currentX,
          currentY: this.currentY
        }

        worker.postMessage({ data: coordinates })

        worker.onmessage = event => {
          let data = JSON.parse(event.data)
          this.app.setAttribute('style', data.style)
        }
      }
    })
  }

  /**
   * Calls when an attribute changes. Setting new
   * title value of the element.
   *
   * @memberof Window
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this.titleText = newValue
      this.appCurrent.textContent = newValue
    }
  }
}

window.customElements.define('window-form', Window)
