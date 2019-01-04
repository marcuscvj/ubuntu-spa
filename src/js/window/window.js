import template from './template.js'

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.titleText = 'Window Object'
    this.modal = this.shadowRoot.querySelector('#modal-dialog')
    this.modalHeader = this.shadowRoot.querySelector('#modal-header')
    this.modalTitle = this.shadowRoot.querySelector('#title')
    this.modalBody = this.shadowRoot.querySelector('#body')
    this.modalCloseBtn = this.shadowRoot.querySelector('#modal-close')
    this.modalFooterCloseBtn = this.shadowRoot.querySelector('#modal-footer-close-btn')
    this.modalIcon = this.shadowRoot.querySelector('#modal-icon')

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
    this.modalTitle.textContent = this.titleText

    this.modalCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.modalFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.addEventListener('touchstart', this.dragStart, false)
    this.addEventListener('touchend', this.dragEnd, false)
    this.addEventListener('touchmove', this.drag, false)
    this.addEventListener('mousedown', this.dragStart, false)
    this.addEventListener('mouseup', this.dragEnd, false)
    this.addEventListener('mousemove', this.drag, false)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this.titleText = newValue
    }
  }

  clearWindow () {
    this.modalBody.innerHTML = ''
  }

  dragStart (event) {
    if (event.type === 'touchstart') {
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY
    } else {
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY
    }

    if (event.target === this) {
      this.active = true
    }
  }

  dragEnd (event) {
    this.initialX = this.currentX
    this.initialY = this.currentY

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

      this.offsetX = this.currentX
      this.offsetY = this.currentY

      let style = 'left:' + this.currentX + 'px;' + 'top:' + this.currentY + 'px;'
      this.modal.setAttribute('style', style)
    }
  }
}

window.customElements.define('window-form', Window)
