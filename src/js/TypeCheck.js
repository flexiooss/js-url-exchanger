import {UrlExchanger} from './UrlExchanger'

export class TypeCheck {
  /**
   *
   * @param instance
   * @return {boolean}
   */
  static isUrlExchanger(instance) {
    return instance instanceof UrlExchanger
  }
}
