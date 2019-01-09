const userInputForm = document.createElement('template')
userInputForm.innerHTML = `
<form id="username-form" autocomplete="off">
  <div class="form-group">
    <label for="inputUsername">Username</label>
    <input type="text" class="form-control" id="inputUsername" name="username" aria-describedby="usernameHelp" placeholder="Enter username">
    <small id="usernameHelp" class="form-text text-muted">To be able to use the chat you must enter a username.</small>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

const messageForm = document.createElement('template')
messageForm.innerHTML = `
<style>
  .form-control {
    overflow-y: scroll;
  }
  .nav {
    margin-bottom: 1em;
  }
  
  .nav a {
    color: inherit;
  }

  .nav-link {
    padding: 0.5rem 1rem 0.5rem 0rem;
    font-family: ubuntubold;
  }
</style>
<ul class="nav">
  <li class="nav-item">
    <a id="change-username" class="nav-link" href="#">Change Username</a>
  </li>
  <li class="nav-item">
    <a id="change-channel" class="nav-link" href="#">Channel</a>
  </li>
</ul>

<div id="select-username" class="form-group" hidden>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">@</span>
    </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Change</button>
  </div>
  </div>
</div>

<div id="select-channel" class="form-group" hidden>
  <div class="input-group">
    <div class="input-group-prepend">
    <div class="input-group-text">#</div>
    </div>
    <input type="text" class="form-control" name="channel" placeholder="channel">
  </div>
</div>

<form id="message-form" autocomplete="off">
  <div class="form-group">
    <textarea class="form-control" rows="8" readonly></textarea>
  </div>
  <div class="form-group">
    <textarea id="message" class="form-control" name="message" rows="2" placeholder="Send a message"></textarea>
  </div>
  <button class="btn btn-primary" type="submit">Send</button>
</form>
`

export { userInputForm, messageForm }
