import {ActionDispatcherBuilder} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '../../../assert'
import {TypeCheck} from '../../../hotballoon'

export class ActionsHandler {
  constructor(dispatcher) {
    assertType(
      TypeCheck.isDispatcher(dispatcher),
      'UrlExchanger:ActionsHandler: '
    )

    /**
     *
     * @type {ActionDispatcher<PushUrlByUrlAction>}
     * @private
     */
    this.__pushUrlByUrlAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.PushUrlByUrlAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<PushUrlByRouteNameAction>}
     * @private
     */
    this.__pushUrlByRouteNameAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.PushUrlByRouteNameAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<ReplaceUrlByUrlAction>}
     * @private
     */
    this.__replaceUrlByUrlAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.ReplaceUrlByUrlAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<ReplaceUrlByRouteNameAction>}
     * @private
     */
    this.__replaceUrlByRouteNameAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.ReplaceUrlByRouteNameAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlPushed>}
     * @private
     */
    this.__urlPushed = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlPushed)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlReplaced>}
     * @private
     */
    this.__urlReplaced = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlReplaced)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlChanged>}
     * @private
     */
    this.__urlChanged = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlChanged)
      .dispatcher(dispatcher)
      .build()

  }

  /**
   *
   * @return {ActionDispatcher<PushUrlByUrlAction>}
   */
  get pushUrlByUrlAction() {
    return this.__pushUrlByUrlAction
  }

  /**
   *
   * @return {ActionDispatcher<PushUrlByRouteNameAction>}
   */
  get pushUrlByRouteNameAction() {
    return this.__pushUrlByRouteNameAction
  }

  /**
   *
   * @return {ActionDispatcher<ReplaceUrlByUrlAction>}
   */
  get replaceUrlByUrlAction() {
    return this.__replaceUrlByUrlAction
  }

  /**
   *
   * @return {ActionDispatcher<ReplaceUrlByRouteNameAction>}
   */
  get replaceUrlByRouteNameAction() {
    return this.__replaceUrlByRouteNameAction
  }

  /**
   *
   * @return {ActionDispatcher<UrlPushed>}
   */
  get urlPushed() {
    return this.__urlPushed
  }

  /**
   *
   * @return {ActionDispatcher<UrlReplaced>}
   */
  get urlReplaced() {
    return this.__urlReplaced
  }

  /**
   *
   * @return {ActionDispatcher<UrlChanged>}
   */
  get urlChanged() {
    return this.__urlChanged
  }
}
