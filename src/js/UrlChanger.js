import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class UrlChanger {
  /**
   *
   * @param {Router} router
   * @param {HistoryClient} historyClient
   */
  constructor(router, historyClient) {
    /**
     *
     * @type {Router}
     * @private
     */
    this.__router = router
    /**
     *
     * @type {HistoryClient}
     * @private
     */
    this.__historyClient = historyClient
  }

  /**
   *
   * @param {FlexUrl} url
   * @param {?Object} historyState
   * @return {FlexUrl}
   */
  pushByUrl(url, historyState) {
    this.__historyClient.pushState(
      this.__historyClient
        .historyStateBuilder()
        .url(url)
        .state(historyState)
        .build()
    )
    return url
  }

  /**
   *
   * @param {string} name
   * @param {ObjectValue} routeParameters
   * @param {ObjectValue} historyState
   * @return {FlexUrl}
   * @throws {RouteException}
   */
  pushByRouteName(name, routeParameters, historyState) {
    const url = this.__router.urlByRouteName(name, routeParameters)

    this.__historyClient.pushState(
      this.__historyClient
        .historyStateBuilder()
        .url(url)
        .state(historyState)
        .build()
    )
    return url
  }

  /**
   *
   * @param {FlexUrl} url
   * @param {ObjectValue} historyState
   * @return {FlexUrl}
   */
  replaceByUrl(url, historyState={}) {
    this.__historyClient.replaceState(
      this.__historyClient
        .historyStateBuilder()
        .url(url)
        .state(historyState)
        .build()
    )
    return url
  }

  /**
   *
   * @param {string} name
   * @param {ObjectValue} routeParameters
   * @param {ObjectValue} historyState
   * @return {FlexUrl}
   * @throws {RouteException}
   */
  replaceByRouteName(name, routeParameters, historyState) {
    const url = this.__router.urlByRouteName(name, routeParameters)
    this.__historyClient.replaceState(
      this.__historyClient
        .historyStateBuilder()
        .url(url)
        .state(historyState)
        .build()
    )
    return url
  }
}
