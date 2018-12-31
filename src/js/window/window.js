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

  *:focus {
    outline: 0 !important;
  }
</style>

<div id="modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div id="modal-header" class="modal-header">
        <h5 id="title" class="modal-title">Modal title</h5>
        <button id="modal-close" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
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
    this._title = 'Window Object'
    this.modalCloseBtn = this.shadowRoot.querySelector('#modal-close')
    // this.modalFooterCloseBtn = this.shadowRoot.querySelector('.modal-footer:first-child')
  }

  static get observedAttributes () {
    return ['title']
  }

  connectedCallback () {
    this.modalCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    })
    /* this.modalFooterCloseBtn.addEventListener('click', event => {
      this.setAttribute('hidden', '')
    }) */
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'title') {
      this._title = newValue
    }
  }
}

window.customElements.define('window-form', Window)
