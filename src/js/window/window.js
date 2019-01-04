import template from './template.js'

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.titleText = 'Window Object'
    this.modal = this.shadowRoot.querySelector('#modal')
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
    console.log(this)
    this.modalTitle.textContent = this.titleText

    this.modalCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.modalFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.surface.addEventListener('touchstart', this.dragStart, false)
    this.surface.addEventListener('touchend', this.dragEnd, false)
    this.surface.addEventListener('touchmove', this.drag, false)
    this.surface.addEventListener('mousedown', this.dragStart, false)
    this.surface.addEventListener('mouseup', this.dragEnd, false)
    this.surface.addEventListener('mousemove', this.drag, false)
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
      this.initialX = event.touches[0].clientX - this.offsetX
      this.initialY = event.touches[0].clientY - this.offsetY
    } else {
      this.initialX = event.clientX - this.offsetX
      this.initialY = event.clientY - this.offsetY
    }

    if (event.target === this.modal) {
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
        this.currentX = event.touches[0].clientX - this.initialX
        this.currentY = event.touches[0].clientY - this.initialY
      } else {
        this.currentX = event.clientX - this.initialX
        this.currentY = event.clientY - this.initialY
      }

      this.offsetX = this.currentX
      this.offsetY = this.currentY

      this.setTranslate(this.currentX, this.currentY, this.modal)
    }
  }

  setTranslate (posX, posY, element) {
    element.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)'
  }
}

window.customElements.define('window-form', Window)
