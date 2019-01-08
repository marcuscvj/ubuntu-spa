import template from './template.js'

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.titleText = 'Window Object'
    this.app = this.shadowRoot.querySelector('#app')
    this.appContent = this.shadowRoot.querySelector('#app .app-container')
    this.appHeader = this.shadowRoot.querySelector('#app .app-container .app-header')
    this.appTitle = this.shadowRoot.querySelector('#app .app-container .app-header .app-title')
    this.appBody = this.shadowRoot.querySelector('#app .app-container .app-body')
    this.appFooterCloseBtn = this.shadowRoot.querySelector('#app .app-container .app-footer .app-close-btn')
    this.appIcon = this.shadowRoot.querySelector('#app .app-container .app-header .app-icon')

    console.log(this.appIcon)
    console.log(this.appHeader)

    // this.app.style.top += 5 increase the top value for the divs when created

    this.surface = document.querySelector('#surface')
    this.active = false
    this.currentX = undefined
    this.currentY = undefined
    this.initialX = undefined
    this.initialY = undefined
    this.offsetX = 0
    this.offsetY = 0
  }

  static get observedAttributes () {
    return ['title']
  }

  connectedCallback () {
    this.appTitle.textContent = this.titleText
    this.app.setAttribute('aria-grabbed', 'false')

    this.appFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    // Used to make the window move
    this.app.addEventListener('touchstart', this.dragStart, false)
    this.app.addEventListener('touchend', this.dragEnd, false)
    this.app.addEventListener('touchmove', this.drag, false)
    this.app.addEventListener('mousedown', this.dragStart, false)
    this.app.addEventListener('mouseup', this.dragEnd, false)
    this.app.addEventListener('mousemove', this.drag, false)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this.titleText = newValue
    }
  }

  clearWindow () {
    this.appBody.innerHTML = ''
  }

  dragStart (event) {
    event.target.setAttribute('aria-grabbed', 'true')
    // this.appHeader.classList.add('modal-on-top')
    if (event.type === 'touchstart') {
      event.preventDefault()
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY
    } else {
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY
    }

    if (event.target === this.app) {
      this.active = true
    }
  }

  dragEnd (event) {
    event.preventDefault()
    this.initialX = this.currentX
    this.initialY = this.currentY

    event.target.setAttribute('aria-grabbed', 'false')
    // this.appHeader.classList.remove('modal-on-top')
    this.active = false
  }

  drag (event) {
    if (this.active) {
      event.preventDefault()
      if (event.type === 'touchmove') {
        this.currentX = event.clientX
        this.currentY = event.clientY
      } else {
        this.currentX = event.clientX
        this.currentY = event.clientY
      }

      let style = 'left:' + this.currentX + 'px;' + 'top:' + this.currentY + 'px;'
      this.app.setAttribute('style', style)
    }
  }
}

window.customElements.define('window-form', Window)
