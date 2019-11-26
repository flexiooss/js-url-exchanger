import {HistoryClient} from '@flexio-oss/js-history-client'
import {TypeCheck as RouterTypeCheck} from '@flexio-oss/js-router'
import {TypeCheck as HotballoonTypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {ActionsHandler} from './ActionsHandler'
import {UrlChanger} from './UrlChanger'
import {UrlHandler} from './UrlHandler'
import {FlexUrlBuilder} from '@flexio-oss/extended-flex-types'

export class UrlExchanger {
  /**
   *
   * @param {HistoryClient} historyClient
   * @param {Router} router
   * @param {Dispatcher} dispatcher
   * @param {ComponentContext} componentContext
   */
  constructor(historyClient, router, dispatcher, componentContext) {
    assertType(historyClient instanceof HistoryClient,
      'ComponentRouter:constructor: `historyClient` argument should be a HistoryClient'
    )
    assertType(RouterTypeCheck.isRouter(router),
      'ComponentRouter:constructor: `router` argument should be a Router'
    )
    assertType(HotballoonTypeCheck.isDispatcher(dispatcher),
      'ComponentRouter:constructor: `dispatcher` argument should be a Dispatcher'
    )
    assertType(HotballoonTypeCheck.isComponentContext(componentContext),
      'ComponentRouter:constructor: `componentContext` argument should be a ComponentContext'
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

    this.__componentContext = componentContext

    /**
     *
     * @type {UrlHandler}
     * @private
     */
    this.__urlHandler = new UrlHandler(
      new UrlChanger(
        router,
        historyClient,
      ),
      historyClient,
      this.__actions,
      this.__componentContext
    )
  }

  /**
   *
   * @param {Location} location
   * @param {?Object} [historyState=null]
   */
  dispatchPushUrlByLocation(location, historyState = null) {

    assertType(
      location instanceof Location,
      'UrlExchanger:dispatchPushUrlByLocation: `location` should be a `Location`'
    )

    this.dispatchPushUrlByUrl(
      new FlexUrlBuilder()
        .value(location.href)
        .build(),
      historyState
    )

  }

  /**
   *
   * @param {FlexUrl} url
   * @param {?Object} [historyState=null]
   */
  dispatchPushUrlByUrl(url, historyState = null) {
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
   * @param {?Object} [historyState=null]
   */
  dispatchPushUrlByRouteName(name, parameters, historyState = null) {
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
   * @param {Location} location
   * @param {?Object} [historyState=null]
   */
  dispatchReplaceUrlByLocation(location, historyState = null) {

    assertType(
      location instanceof Location,
      'UrlExchanger:dispatchReplaceUrlByLocation: `location` should be a `Location`'
    )

    this.dispatchReplaceUrlByUrl(
      new FlexUrlBuilder()
        .value(location.href)
        .build(),
      historyState
    )

  }

  /**
   *
   * @param {FlexUrl} url
   * @param {?Object} [historyState=null]
   */
  dispatchReplaceUrlByUrl(url, historyState = null) {
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
   * @param {?Object} [historyState=null]
   */
  dispatchReplaceUrlByRouteName(name, parameters, historyState = null) {
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
      .listenWithCallback(clb, this.__componentContext)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlReplaced>} clb
   * @returns {String} token
   */
  listenUrlReplaced(clb) {
    return this.__actions
      .urlReplaced
      .listenWithCallback(clb, this.__componentContext)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlChanged>} clb
   * @returns {String} token
   */
  listenUrlChanged(clb) {
    return this.__actions
      .urlChanged
      .listenWithCallback(clb, this.__componentContext)
  }

}
