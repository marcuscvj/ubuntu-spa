/**
 * Time module.
 *
 * @module src/js/time/time
 * @author Marcus Cvjeticanin
 * @version 1.2
 */

/**
   * Displays current time in the navigation bar
   * in format HH:MM:SS
   * @param {HTMLElement}
   */
export default function displayCurrentTime (element) {
  setInterval(() => {
    let d = new Date()
    element.innerHTML = checkTime(d.getHours()) + ':' + checkTime(d.getMinutes()) + ':' + checkTime(d.getSeconds())
  }, 1000)
}

/**
   * Checks if the time is less than 10
   * and adds a zero if it's false
   *
   * @returns {String}
   */
function checkTime (i) {
  if (i < 10) {
    i = '0' + i
  }

  return i
}
