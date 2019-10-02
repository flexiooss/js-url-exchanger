import {UrlChanger} from './UrlChanger'

export class UrlHandler {
  /**
   *
   * @param {UrlChanger} urlChanger
   * @param {HistoryClient} historyClient
   * @param {ActionsHandler} actionsHandler
   */
  constructor(urlChanger, historyClient, actionsHandler) {
    /**
     *
     * @type {UrlChanger}
     * @private
     */
    this.__urlChanger = urlChanger
    /**
     *
     * @type {HistoryClient}
     * @private
     */
    this.__historyClient = historyClient
    /**
     *
     * @type {ActionsHandler}
     * @private
     */
    this.__actionsHandler = actionsHandler

    this.__listenActions()
    this.__listenHistory()
  }

  /**
   *
   * @private
   */
  __listenActions() {
    this.__actionsHandler
      .replaceUrlByUrlAction
      .listenWithCallback(
        /**
         *
         * @param {ReplaceUrlByUrlAction} payload
         */
        (payload) => {
          this.__replaceByUrl(payload)
        }
      )

    this.__actionsHandler
      .replaceUrlByRouteNameAction
      .listenWithCallback(
        /**
         *
         * @param {ReplaceUrlByRouteNameAction} payload
         */
        (payload) => {
          this.__replaceByRouteName(payload)
        }
      )

    this.__actionsHandler
      .pushUrlByUrlAction
      .listenWithCallback(
        /**
         *
         * @param {PushUrlByUrlAction} payload
         */
        (payload) => {
          this.__pushByUrl(payload)
        }
      )

    this.__actionsHandler
      .pushUrlByRouteNameAction
      .listenWithCallback(
        /**
         *
         * @param {PushUrlByRouteNameAction} payload
         */
        (payload) => {
          this.__pushByRouteName(payload)
        }
      )
  }

  /**
   *
   * @private
   */
  __listenHistory() {
    this.__historyClient
      .onPopState(
        /**
         *
         * @param {HistoryState} historyState
         */
        (historyState) => {
          this.__dispatchUrlChanged(historyState.url())
        }
      )
  }

  /**
   *
   * @param {PushUrlByUrlAction} payload
   * @private
   */
  __pushByUrl(payload) {

    this.__dispatchUrlPushed(
      this.__urlChanger
        .pushByUrl(
          payload.url(),
          payload.historyState()
        )
    )
  }

  /**
   *
   * @param {PushUrlByRouteNameAction} payload
   * @private
   */
  __pushByRouteName(payload) {

    this.__dispatchUrlPushed(
      this.__urlChanger
        .pushByRouteName(
          payload.name(),
          payload.parameters(),
          payload.historyState()
        )
    )
  }

  /**
   *
   * @param {ReplaceUrlByUrlAction} payload
   * @private
   */
  __replaceByUrl(payload) {
    this.__dispatchUrlReplaced(
      this.__urlChanger
        .replaceByUrl(
          payload.url(),
          payload.historyState()
        )
    )

  }

  /**
   *
   * @param {ReplaceUrlByRouteNameAction} payload
   * @private
   */
  __replaceByRouteName(payload) {
    this.__dispatchUrlReplaced(
      this.__urlChanger
        .replaceByRouteName(
          payload.name(),
          payload.parameters(),
          payload.historyState()
        )
    )
  }

  /**
   *
   * @param {FlexUrl} url
   * @private
   */
  __dispatchUrlPushed(url) {
    this.__actionsHandler
      .urlPushed
      .dispatch(
        this.__actionsHandler
          .urlPushed
          .payloadBuilder()
          .url(url)
          .build()
      )

    this.__dispatchUrlChanged(url)
  }

  /**
   *
   * @param {FlexUrl} url
   * @private
   */
  __dispatchUrlReplaced(url) {
    this.__actionsHandler
      .urlReplaced
      .dispatch(
        this.__actionsHandler
          .urlReplaced
          .payloadBuilder()
          .url(url)
          .build()
      )

    this.__dispatchUrlChanged(url)
  }

  /**
   *
   * @param {FlexUrl} url
   * @private
   */
  __dispatchUrlChanged(url) {
    this.__actionsHandler
      .urlChanged
      .dispatch(
        this.__actionsHandler
          .urlChanged
          .payloadBuilder()
          .url(url)
          .build()
      )
  }
}
