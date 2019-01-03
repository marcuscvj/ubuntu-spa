import template from './template.js'

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.titleText = 'Window Object'
    this.modalTitle = this.shadowRoot.querySelector('#title')
    this.modalBody = this.shadowRoot.querySelector('#body')
    this.modalCloseBtn = this.shadowRoot.querySelector('#modal-close')
    this.modalFooterCloseBtn = this.shadowRoot.querySelector('#modal-footer-close-btn')
    this.modalIcon = this.shadowRoot.querySelector('#modal-icon')
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
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this.titleText = newValue
    }
  }

  clearWindow () {
    this.modalBody.innerHTML = ''
  }
}

window.customElements.define('window-form', Window)
