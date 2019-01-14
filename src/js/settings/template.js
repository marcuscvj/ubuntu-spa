const template = document.createElement('template')
template.innerHTML = `
<style>
  #settings {
    height: auto;
  }

  .settings-item {
    color: inherit;
    text-decoration: none !important;
    display: inline-block;
  }

  #settings span:hover,
  #settings img:hover {
    opacity: 0.5 !important;
    -o-transition: 1s;
    -ms-transition: 1s;
    -moz-transition: 1s;
    -webkit-transition: 1s;
    transition: 1s;
  }

  #settings a img {
    display: block;
  }

  #settings a span {
    margin-left: 10px;
    display: block;
  }

  #controllers h3 {
    margin-bottom: 1rem;
  }

  .custom-file {
    margin-bottom: 1rem;
  }
</style>

<div id="settings">
  <div>
    <a id="settings-background" class="settings-item" href="#">
      <img src="/image/settings/settings-background.png" alt="Background">
      <span>Background</span>
    </a>

    <a id="settings-language" class="settings-item"href="#">
      <img src="/image/settings/settings-language.png" alt="Language">
      <span>Language</span>
    </a>

    <a id="settings-date-time" class="settings-item" href="#">
      <img src="/image/settings/settings-date-time.png" alt="Date & time">
      <span>Date & time</span>
    </a>
  </div>

  <div id="controllers" hidden>
    <div class="background" hidden>
      <form enctype="multipart/form-data" method="post">
        <h3>Change background</h3>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div> 
     
  </div>

</div>
`

export default template
