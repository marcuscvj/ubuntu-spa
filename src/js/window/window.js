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
    this.modalTitle.textContent = this.titleText

    this.modalCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.modalFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })

    this.surface.addEventListener('touchstart', this.dragStart, false)
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
  
}

window.customElements.define('window-form', Window)
