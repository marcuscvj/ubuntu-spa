/**
 * Clock module.
 *
 * @module src/js/clock/clock
 * @author Marcus Cvjeticanin
 * @version 1.1
 */

import { Window } from '../window/window.js'
import template from './template.js'

/**
 * A Memory application that inherits from Window.
 *
 * @class Memory
 * @extends {Window}
 */
export class Clock extends Window {
  /**
   * Creates an instance of Memory.
   *
   * @memberof Memory
   */
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/clock.png')
    this.appIcon.setAttribute('alt', 'Clock')
    this.appBody.appendChild(template.content.cloneNode(true))

    this.runStopwatch = true
    this.runTimer = true

    this.stopWatchNavItem = this.appBody.querySelector('#stopwatch-tab')
    this.timerNavItem = this.appBody.querySelector('#timer-tab')
    this.stopWatchTab = this.appBody.querySelector('#stopwatch')
    this.timerTab = this.appBody.querySelector('#timer')

    this.appBody.addEventListener('click', event => {
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
        this.runStopwatch = true
        this.stopwatch()
      } else if (event.target.id === 'stopwatch-reset-btn') {
        this.runStopwatch = false
      } else if (event.target.id === 'timer-btn') {
        this.runTimer = true
        let timeInputs = this.appBody.querySelector('#time-input').querySelectorAll('input')

        let h = parseInt(timeInputs[0].value)
        let m = parseInt(timeInputs[1].value)
        let s = parseInt(timeInputs[2].value)

        this.timer(h, m, s)

        this.appBody.querySelector('#timer-btn').hidden = true
        this.timerTab.firstElementChild.hidden = false
        this.appBody.querySelector('#time-input').hidden = true
      } else if (event.target.id === 'timer-new-btn') {
        this.runTimer = false

        this.appBody.querySelector('#time-input').hidden = false
        this.appBody.querySelector('#timer-btn').hidden = false
        this.timerTab.firstElementChild.hidden = true
      }
    })
  }

  /**
   * A stopwatch method.
   *
   * @memberof Clock
   */
  stopwatch () {
    let seconds = 0

    let counter = setInterval(() => {
      if (!this.runStopwatch) {
        clearInterval(counter)
        this.stopWatchTab.firstElementChild.innerHTML = '00:00:00'
      } else {
        this.stopWatchTab.firstElementChild.innerHTML = this.displayTime(seconds)
        seconds++
      }
    }, 1000)
  }

  /**
   * A timer method.
   *
   * @memberof Clock
   */
  timer (hours, minutes, seconds) {
    let hoursToSeconds = hours * 60 * 60
    let minutesToSeconds = minutes * 60
    let totalSeconds = hoursToSeconds + minutesToSeconds + seconds

    let timer = setInterval(() => {
      if (!this.runTimer) {
        clearInterval(timer)
        this.timerTab.firstElementChild.innerHTML = '00:00:00'
      } else {
        this.timerTab.firstElementChild.innerHTML = this.displayTime(totalSeconds)
        totalSeconds--
        if (totalSeconds < 0) {
          clearInterval(timer)
        }
      }
    }, 1000)
  }

  /**
   * Returns the current time in format
   * HH:MM:SS
   *
   * @memberof Clock
   * @returns {String}
   */
  displayTime (seconds) {
    let h = Math.floor(seconds / 3600) % 24
    let m = Math.floor(seconds / 60) % 60
    let s = seconds % 60
    let time = this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s)

    return time
  }

  /**
   * Checks if the time is less than 10
   * and adds a zero if it's false
   *
   * @memberof Clock
   * @returns {String}
   */
  checkTime (i) {
    if (i < 10) {
      i = '0' + i
    }

    return i
  }
}

window.customElements.define('clock-form', Clock)
