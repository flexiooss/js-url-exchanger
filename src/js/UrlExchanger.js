import {HistoryClient} from '@flexio-oss/js-history-client'
import {TypeCheck as RouterTypeCheck} from '@flexio-oss/js-router'
import {TypeCheck as HotballoonTypeCheck} from '@flexio-oss/hotballoon'
import {assertType, TypeCheck as PrimitiveTypeCheck} from '@flexio-oss/assert'
import {ActionsHandler} from './ActionsHandler'
import {UrlChanger} from './UrlChanger'
import {UrlHandler} from './UrlHandler'
import {FlexUrlBuilder} from '@flexio-oss/extended-flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

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
   * @param {?Object} [historyState={}]
   */
  dispatchPushUrlByLocation(location, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

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
   * @param {?Object} [historyState={}]
   */
  dispatchPushUrlByUrl(url, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

    this.__actions
      .pushUrlByUrlAction()
      .dispatch(
        this.__actions
          .pushUrlByUrlAction()
          .payloadBuilder()
          .url(url)
          .historyState(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(historyState).build())
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {?Object} [parameters={}]
   * @param {?Object} [historyState={}]
   */
  dispatchPushUrlByRouteName(name, parameters={}, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(parameters)
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

    this.__actions
      .pushUrlByRouteNameAction()
      .dispatch(
        this.__actions
          .pushUrlByRouteNameAction()
          .payloadBuilder()
          .name(name)
          .parameters(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(parameters).build())
          .historyState(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(historyState).build())
          .build()
      )
  }

  /**
   *
   * @param {Location} location
   * @param {?Object} [historyState={}]
   */
  dispatchReplaceUrlByLocation(location, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

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
   * @param {?Object} [historyState={}]
   */
  dispatchReplaceUrlByUrl(url, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

    this.__actions
      .replaceUrlByUrlAction()
      .dispatch(
        this.__actions
          .replaceUrlByUrlAction()
          .payloadBuilder()
          .url(url)
          .historyState(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(historyState).build())
          .build()
      )
  }

  /**
   *
   * @param {string} name
   * @param {Object} parameters
   * @param {?Object} [historyState={}]
   */
  dispatchReplaceUrlByRouteName(name, parameters = {}, historyState = {}) {
    PrimitiveTypeCheck.assertIsStrictObject(parameters)
    PrimitiveTypeCheck.assertIsStrictObject(historyState)

    this.__actions
      .replaceUrlByRouteNameAction()
      .dispatch(
        this.__actions
          .replaceUrlByRouteNameAction()
          .payloadBuilder()
          .name(name)
          .parameters(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(parameters).build())
          .historyState(globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject(historyState).build())
          .build()
      )
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlPushed>} clb
   * @returns {String} externalChooserPublic
   */
  listenUrlPushed(clb) {
    return this.__actions
      .urlPushed()
      .listenWithCallback(clb, this.__componentContext)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlReplaced>} clb
   * @returns {String} externalChooserPublic
   */
  listenUrlReplaced(clb) {
    return this.__actions
      .urlReplaced()
      .listenWithCallback(clb, this.__componentContext)
  }

  /**
   *
   * @param {ActionDispatcher~eventClb<UrlChanged>} clb
   * @returns {String} externalChooserPublic
   */
  listenUrlChanged(clb) {
    return this.__actions
      .urlChanged()
      .listenWithCallback(clb, this.__componentContext)
  }
}
