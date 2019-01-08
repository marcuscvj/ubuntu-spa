const template = document.createElement('template')
template.innerHTML = `
<style>
@import url('../../css/bootstrap.min.css');

  #app {
    transform: translate3d(10px, 10px, 0);
    position: absolute;
    z-index: 9;
    width: 500px;
    height: auto;
    min-height: 300px;
    background-color: #F2F1F0;
    border: 1px solid black;
    border-radius: .25rem;
    float: left;
    -webkit-box-shadow:  10px 10px 50px 1px rgba(0, 0, 0, 0.7);
    -moz-box-shadow:     10px 10px 50px 1px rgba(0, 0, 0, 0.7);
    box-shadow:          10px 10px 50px 1px rgba(0, 0, 0, 0.7);
    touch-action: none;
    user-select: none;
  }

  #app:active {
    background-color: rgba(168, 218, 220, 1.00);
  }

  .app-header {
    padding: 0.2rem 1rem;
    background: linear-gradient(#616155 , #483C3C);
    color: #DAD8D1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  #app:hover {
    cursor: pointer;
    border-width: 2px;
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
</style>

<div id="app">
  <div class="app-container">
    <div class="app-header">
      <img class="app-icon">
      <h5 class="app-title">Modal title</h5>
    </div>
    <div class="app-body"></div>
    <div class="app-footer">
      <button type="button" class="btn btn-light app-close-btn" data-dismiss="modal">Close</button>
    </div>
  </div>
</div>
`

export default template
