const template = document.createElement('template')
template.innerHTML = `
<style>
  @import url('../../css/bootstrap.min.css');

  .modal {
    display: initial;
    position: absolute;
  }

  .modal-dialog {
    position: absolute;
    width: inherit;
    top: 5%;
    left: 5%;
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

  .modal-header:hover {
    cursor: pointer;
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
    padding: 0.3rem 0.5rem;
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

  @media (min-width: 576px) {
    .modal-dialog {
        max-width: 500px;
        margin: 0;
    }
  }
</style>

<div id="modal" class="modal" tabindex="-1">
  <div id="modal-dialog" class="modal-dialog" aria-hidden="true">
    <div id="modal-content" class="modal-content">
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

export default template
