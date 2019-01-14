/**
 * Settings module.
 *
 * @module src/js/settings/settings
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

import { Window } from '../window/window.js'
import template from './template.js'

/**
 * A Settings application that inherits from Window.
 *
 * @class Settings
 * @extends {Window}
 */
export class Settings extends Window {
  /**
   * Creates an instance of Memory.
   *
   * @memberof Settings
   */
  constructor () {
    super()
    this.appIcon.setAttribute('src', '/image/nav/settings.png')
    this.appIcon.setAttribute('alt', 'Settings')
    this.appBody.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('settings-form', Settings)
