export class UrlChanger {
  /**
   *
   * @param {Router} router
   */
  constructor(router){
    this.__router = router
  }
  /**
   *
   * @param {FlexUrl} url
   * @return {UrlExchanger}
   */
  pushByUrl(url) {
    this.__changeUrl(url)
    return this
  }

  /**
   *
   * @param {string} name
   * @param {?Object} [routeParameters=null]
   * @return {UrlExchanger}
   * @throws {RouteException}
   */
  pushByRouteName(name, routeParameters) {
    const url = this.__router.urlByRouteName(name, routeParameters)
    this.__changeUrl(url)
    return this
  }
  /**
   *
   * @param {FlexUrl} url
   * @return {UrlExchanger}
   */
  replaceByUrl(url) {
    this.__changeUrl(url)
    return this
  }

  /**
   *
   * @param {string} name
   * @param {?Object} [routeParameters=null]
   * @return {UrlExchanger}
   * @throws {RouteException}
   */
  replaceByRouteName(name, routeParameters) {
    const url = this.__router.urlByRouteName(name, routeParameters)
    this.__changeUrl(url)
    return this
  }

  /**
   *
   * @param {FlexUrl} url
   * @private
   */
  __changeUrl(url) {

  }
}
