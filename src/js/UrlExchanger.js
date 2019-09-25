import {HistoryClient} from '@flexio-oss/js-history-client'
import {TypeCheck as RouterTypeCheck} from '@flexio-oss/js-router'
import {TypeCheck as HotballoonTypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {ActionsHandler} from './ActionsHandler'
import {UrlChanger} from './UrlChanger'
import {UrlHandler} from './UrlHandler'

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

    /**
     *
     * @type {UrlHandler}
     * @private
     */
    this.__urlHandler = new UrlHandler(
      new UrlChanger(
        router,
        historyClient
      ),
      historyClient,
      this.__actions
    )
  }

  /**
   *
   * @param {FlexUrl} url
   * @param {?Object} historyState
   */
  dispatchPushUrlByUrl(url, historyState) {
    this.__actions
      .pushUrlByUrlAction
      .dispatch(
        this.__actions
          .pushUrlByUrlAction
          .payloadBuilder()
          .url(url)
          .historyState(historyState)
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {Object} parameters
   * @param {?Object} historyState
   */
  dispatchPushUrlByRouteName(name, parameters, historyState) {
    this.__actions
      .pushUrlByRouteNameAction
      .dispatch(
        this.__actions
          .pushUrlByRouteNameAction
          .payloadBuilder()
          .name(name)
          .parameters(parameters)
          .historyState(historyState)
          .build()
      )
  }

  /**
   *
   * @param {FlexUrl} url
   * @param {?Object} historyState
   */
  dispatchReplaceUrlByUrl(url, historyState) {
    this.__actions
      .replaceUrlByUrlAction
      .dispatch(
        this.__actions
          .replaceUrlByUrlAction
          .payloadBuilder()
          .url(url)
          .historyState(historyState)
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {Object} parameters
   * @param {?Object} historyState
   */
  dispatchReplaceUrlByRouteName(name, parameters, historyState) {
    this.__actions
      .replaceUrlByRouteNameAction
      .dispatch(
        this.__actions
          .replaceUrlByRouteNameAction
          .payloadBuilder()
          .name(name)
          .parameters(parameters)
          .historyState(historyState)
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
