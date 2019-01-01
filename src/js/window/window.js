const t = document.createElement('template')
t.innerHTML = `
<style>
  @import url('../../css/bootstrap.min.css');

  .modal {
    display: initial;
    position: unset;
  }

  .modal-content {
    background-color: #F2F1F0;
    border-radius: .25rem;
    -webkit-box-shadow:  10px 10px 50px 1px rgba(0, 0, 0, 0.7);
    -moz-box-shadow:     10px 10px 50px 1px rgba(0, 0, 0, 0.7);
    box-shadow:          10px 10px 50px 1px rgba(0, 0, 0, 0.7);
  }

  .modal-header {
    padding: 0.2rem 1rem;
    background: linear-gradient(#616155 , #483C3C);
    color: #DAD8D1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .modal-header .close {
    padding: 0.9rem 0.9rem;
  }

  .modal-body {
    font-size: 0.9rem;
  }

  .modal-title {
    font-family: ubuntubold;
    font-size: 1rem;
  }

  .modal-footer {
    padding: 0.5rem;
    border-top: none;
  }

  #modal-icon {
    width: 24px;
    height: auto;
    margin-right: 10px;
  }

  .close {
    color: #DAD8D1;
    text-shadow: none;
  }

  .btn {
    padding: 0.1rem 0.5rem;
  }

  .btn-light {
    background-color: inherit;
    border-color: #cacaca; 
  }

  .btn-primary {
    color: #fff;
    background-color: #8D1440;
    border-color: #630225;
  }

  .btn-primary:not(:disabled):not(.disabled).active,
  .btn-primary:not(:disabled):not(.disabled):active,
  .show>.btn-primary.dropdown-toggle,
  .btn-primary:hover {
    color: #fff;
    background-color: #540c26;
    border-color: #630225;
  }

  *:focus {
    outline: 0 !important;
  }
</style>

<div id="modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div id="modal-header" class="modal-header">
        <img id="modal-icon">
        <h5 id="title" class="modal-title">Modal title</h5>
        <button id="modal-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="body" class="modal-body"></div>
      <div class="modal-footer">
        <button id="modal-footer-close-btn" type="button" class="btn btn-light" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`

export class Window extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(t.content.cloneNode(true))
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
