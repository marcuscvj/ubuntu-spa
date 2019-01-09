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
<ul class="nav">
  <li class="nav-item">
    <a id="change-username" class="nav-link" href="#">Change Username</a>
  </li>
  <li class="nav-item">
    <a id="change-channel" class="nav-link" href="#">Channel</a>
  </li>
  <li class="nav-item">
    <a id="chat-settings" class="nav-link" href="#">Settings</a>
  </li>
</ul>

<div id="settings" hidden>
  <div class="custom-control custom-switch">
    <input type="checkbox" class="custom-control-input" id="dark-theme">
    <label class="custom-control-label" for="dark-theme">Use dark theme</label>
  </div>
</div>

<form id="new-username" autocomplete="off" hidden>
  <div class="form-row align-items-center">
    <div class="col-sm-10">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">@</div>
        </div>
        <input type="text" class="form-control" placeholder="username" name="username">
      </div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>

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
    <div class="messages"></div>
  </div>
  <div class="form-group">
    <textarea id="message" class="form-control" name="message" rows="2" placeholder="Send a message"></textarea>
  </div>
  <button class="btn btn-primary" type="submit">Send</button>
</form>
`

const defaultStyle = document.createElement('template')
defaultStyle.innerHTML = `
<style>
  .form-control {
    overflow-y: scroll;
  }
  
  .nav {
    margin-bottom: 1rem;
  }
  
  .nav a {
    color: inherit;
  }

  .nav-link {
    padding: 0.5rem 1rem 0.5rem 0rem;
    font-family: ubuntubold;
  }

  .btn-outline-secondary {
    color: #fff;
    background-color: #8D1440;
    border-color: #630225;
  }

  .btn-outline-secondary:active,
  .btn-outline-secondary:hover {
    color: #fff;
    background-color: #540c26;
    border-color: #630225;
  }

  #new-username {
    margin-bottom: 1rem;
  }

  .messages {
    padding: 0.3rem 0.3rem 0.5rem 0.5rem;
    min-height: 200px;
    max-height: 300px;
    width: 100%;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    color: #5c5063;
    font-size: 1rem;
    background-color: #fff;
    overflow-y: scroll;
  }
  
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding: 0.5rem 0 0.5rem 0;
  }

  #message-time { 
    font-size: 70%;
    font-style: italic;
    margin-left: 0.5rem;
    color: #c3c3c3;
  }

  #settings {
    margin-bottom: 1rem;
  }
</style>
`

const settingsStyle = document.createElement('template')
settingsStyle.innerHTML = `
<style>
.messages {
  background-color: #212121;
  color: #ccc;
}

.message {
  border-bottom: 1px solid #404040;
  color: #ccc;
}

#message-time {
  color: #636363;
}
</style>
`

export { userInputForm, messageForm, defaultStyle, settingsStyle }
