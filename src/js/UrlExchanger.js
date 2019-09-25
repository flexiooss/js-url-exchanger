import {HistoryClient} from '@flexio-oss/js-history-client'
import {TypeCheck as RouterTypeCheck} from '@flexio-oss/js-router'
import {TypeCheck as HotballoonTypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {ActionsHandler} from './ActionsHandler'
import {UrlChanger} from './UrlChanger'

export class UrlExchanger {
  /**
   *
   * @param {HistoryClient} historyClient
   * @param {Router} router
   * @param {Dispatcher} dispatcher
   */
  constructor(historyClient, router, dispatcher) {
    assertType(historyClient instanceof HistoryClient,
      'ComponentRouter:constructor: `historyClient` argument should be a HistoryClient'
    )
    assertType(RouterTypeCheck.isRouter(router),
      'ComponentRouter:constructor: `router` argument should be a Router'
    )
    assertType(HotballoonTypeCheck.isDispatcher(dispatcher),
      'ComponentRouter:constructor: `dispatcher` argument should be a Dispatcher'
    )

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
    this.__actions = new ActionsHandler(dispatcher)

    this.__urlHandler = new UrlHandler(
      new UrlChanger(router),
      historyClient,
      this.__actions
    )

    this.init()
  }

  init() {
    this.__actions
      .replaceUrlByUrlAction
      .listenWithCallback()
  }



  /**
   *
   * @param {FlexUrl} url
   */
  dispatchPushUrlByUrl(url) {
    this.__actions
      .pushUrlByUrlAction
      .dispatch(
        this.__actions
          .pushUrlByUrlAction
          .payloadBuilder()
          .url(url)
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {Object} parameters
   */
  dispatchPushUrlByRouteName(name, parameters) {
    this.__actions
      .pushUrlByRouteNameAction
      .dispatch(
        this.__actions
          .pushUrlByRouteNameAction
          .payloadBuilder()
          .name(name)
          .parameters(parameters)
          .build()
      )
  }

  /**
   *
   * @param {FlexUrl} url
   */
  dispatchReplaceUrlByUrl(url) {
    this.__actions
      .replaceUrlByUrlAction
      .dispatch(
        this.__actions
          .replaceUrlByUrlAction
          .payloadBuilder()
          .url(url)
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {Object} parameters
   */
  dispatchReplaceUrlByRouteName(name, parameters) {
    this.__actions
      .replaceUrlByRouteNameAction
      .dispatch(
        this.__actions
          .replaceUrlByRouteNameAction
          .payloadBuilder()
          .name(name)
          .parameters(parameters)
          .build()
      )
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlPushed>} clb
   * @returns {String} token
   */
  listenUrlPushed(clb) {
    return this.__actions
      .urlPushed
      .listenWithCallback(clb)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlReplaced>} clb
   * @returns {String} token
   */
  listenUrlReplaced(clb) {
    return this.__actions
      .urlReplaced
      .listenWithCallback(clb)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlChanged>} clb
   * @returns {String} token
   */
  listenUrlChanged(clb) {
    return this.__actions
      .urlChanged
      .listenWithCallback(clb)
  }

}
