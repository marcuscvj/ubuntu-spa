import { Window } from '../window/window.js'

const clockDiv = document.createElement('template')
clockDiv.innerHTML = `
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

export class Clock extends Window {
  constructor () {
    super()
    this.modalIcon.setAttribute('src', '/image/nav/clock.png')
    this.modalIcon.setAttribute('alt', 'Clock')
    this.modalBody.appendChild(clockDiv.content.cloneNode(true))
    
    this.runStopwatch = true
    this.runTimer = true

    this.stopWatchNavItem = this.modalBody.querySelector('#stopwatch-tab')
    this.timerNavItem = this.modalBody.querySelector('#timer-tab')
    this.stopWatchTab = this.modalBody.querySelector('#stopwatch')
    this.timerTab = this.modalBody.querySelector('#timer')

    this.modalBody.addEventListener('click', event => {
      if (event.target.id === 'stopwatch-tab') {
        if (!this.stopWatchTab.classList.contains('show active')) {
          this.stopWatchNavItem.setAttribute('class', 'nav-link active')
          this.stopWatchTab.setAttribute('class', 'tab-pane fade show active')

          this.timerNavItem.classList.remove('active')
          this.timerTab.classList.remove('show')
          this.timerTab.classList.remove('active')
        }
      } else if (event.target.id === 'timer-tab') {
        if (!this.timerTab.classList.contains('show active')) {
          this.timerNavItem.setAttribute('class', 'nav-link active')
          this.timerTab.setAttribute('class', 'tab-pane fade show active')

          this.stopWatchNavItem.classList.remove('active')
          this.stopWatchTab.classList.remove('show')
          this.stopWatchTab.classList.remove('active')
        }
      } else if (event.target.id === 'stopwatch-start-btn') {
        this.stopwatch()
      } else if (event.target.id === 'stopwatch-reset-btn') {
        this.runStopwatch = false
      } else if (event.target.id === 'timer-btn') {
        this.runTimer = true
        let timeInputs = this.modalBody.querySelector('#time-input').querySelectorAll('input')

        let h = parseInt(timeInputs[0].value)
        let m = parseInt(timeInputs[1].value)
        let s = parseInt(timeInputs[2].value)

        this.timer(h, m, s)
        this.modalBody.querySelector('#timer-btn').hidden = true
        this.timerTab.firstElementChild.hidden = false
        this.modalBody.querySelector('#time-input').hidden = true
      } else if (event.target.id === 'timer-new-btn') {
        this.runTimer = false
        this.modalBody.querySelector('#time-input').hidden = false
        this.modalBody.querySelector('#timer-btn').hidden = false
        this.timerTab.firstElementChild.hidden = true
      }
    })
  }

  stopwatch () {
    let seconds = 0

    let counter = setInterval(() => {
      if (!this.runStopwatch) {
        clearInterval(counter)
      } else {
        this.stopWatchTab.firstElementChild.innerHTML = seconds
        seconds++
      }
    }, 1000)
  }

  timer (hours, minutes, seconds) {
    let hoursToSeconds = hours * 60 * 60
    let minutesToSeconds = minutes * 60
    let totalSeconds = hoursToSeconds + minutesToSeconds + seconds

    let timer = setInterval(() => {
      if (!this.runTimer) {
        clearInterval(timer)
      } else {
        this.timerTab.firstElementChild.innerHTML = this.displayTime(totalSeconds)
        totalSeconds--
        if (totalSeconds < 0) {
          clearInterval(timer)
        }
      }
    }, 1000)
  }

  displayTime (seconds) {
    let h = Math.floor(seconds / 3600) % 24
    let m = Math.floor(seconds / 60) % 60
    let s = seconds % 60
    let time = this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s)

    return time
  }

  checkTime (i) {
    if (i < 10) {
      i = '0' + i
    }

    return i
  }
}

window.customElements.define('clock-form', Clock)
