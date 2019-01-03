const userInputForm = document.createElement('template')
userInputForm.innerHTML = `
<form id="username-form">
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
</style>
<div id="select-channel" class="form-group">
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
