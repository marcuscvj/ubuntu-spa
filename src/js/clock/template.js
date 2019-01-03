const template = document.createElement('template')
template.innerHTML = `
<style>
  a {
    color: inherit;
  }
  
  a:hover,
  a:active {
    color: inherit;
  }

  .nav {
    margin-bottom: 1em;
  }

  #time,
  #stopwatch-time {
    font-size: 5rem;
  }

  .input-group {
    margin-bottom: 1em;
  }
</style>
<ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="stopwatch-tab" data-toggle="tab" href="#stopwatch" role="tab" aria-controls="stopwatch" aria-selected="true">Stopwatch</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="timer-tab" data-toggle="tab" href="#timer" role="tab" aria-controls="timer" aria-selected="false">Timer</a>
  </li>
</ul>

<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="stopwatch" role="tabpanel" aria-labelledby="stopwatch-tab">
    <p id="stopwatch-time"></p>
    <button id="stopwatch-start-btn" class="btn btn-primary" type="submit">Start</button>
    <button id="stopwatch-reset-btn" class="btn btn-light" type="submit">Reset</button>
  </div>
  <div class="tab-pane fade" id="timer" role="tabpanel" aria-labelledby="timer-tab">
    <p id="time"></p>
    
    <div id="time-input" class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Time: </span>
      </div>
      <input type="text" aria-label="Hours" class="form-control" placeholder="Hours">
      <input type="text" aria-label="Minutes" class="form-control" placeholder="Minutes">
      <input type="text" aria-label="Seconds" class="form-control" placeholder="Seconds">
    </div>

    <button id="timer-btn" class="btn btn-primary" type="submit">Start</button>
    <button id="timer-new-btn" class="btn btn-light" type="submit">Reset</button>
  </div>
</div>
`

export default template
