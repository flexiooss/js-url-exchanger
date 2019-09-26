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
     * @type {ActionDispatcher<PushUrlByUrlAction, PushUrlByUrlActionBuilder>}
     * @private
     */
    this.__pushUrlByUrlAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.PushUrlByUrlAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<PushUrlByRouteNameAction, PushUrlByRouteNameActionBuilder>}
     * @private
     */
    this.__pushUrlByRouteNameAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.PushUrlByRouteNameAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<ReplaceUrlByUrlAction, ReplaceUrlByUrlActionBuilder>}
     * @private
     */
    this.__replaceUrlByUrlAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.ReplaceUrlByUrlAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<ReplaceUrlByRouteNameAction, ReplaceUrlByRouteNameActionBuilder>}
     * @private
     */
    this.__replaceUrlByRouteNameAction = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.ReplaceUrlByRouteNameAction)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlPushed, UrlPushedBuilder>}
     * @private
     */
    this.__urlPushed = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlPushed)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlReplaced, UrlReplacedBuilder>}
     * @private
     */
    this.__urlReplaced = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlReplaced)
      .dispatcher(dispatcher)
      .build()

    /**
     *
     * @type {ActionDispatcher<UrlChanged, UrlChangedBuilder>}
     * @private
     */
    this.__urlChanged = new ActionDispatcherBuilder()
      .type(globalFlexioImport.io.flexio.js_url_exchanger.actions.UrlChanged)
      .dispatcher(dispatcher)
      .build()

  }

  /**
   *
   * @return {ActionDispatcher<PushUrlByUrlAction, PushUrlByUrlActionBuilder>}
   */
  get pushUrlByUrlAction() {
    return this.__pushUrlByUrlAction
  }

  /**
   *
   * @return {ActionDispatcher<PushUrlByRouteNameAction, PushUrlByRouteNameActionBuilder>}
   */
  get pushUrlByRouteNameAction() {
    return this.__pushUrlByRouteNameAction
  }

  /**
   *
   * @return {ActionDispatcher<ReplaceUrlByUrlAction, ReplaceUrlByUrlActionBuilder>}
   */
  get replaceUrlByUrlAction() {
    return this.__replaceUrlByUrlAction
  }

  /**
   *
   * @return {ActionDispatcher<ReplaceUrlByRouteNameAction, ReplaceUrlByRouteNameActionBuilder>}
   */
  get replaceUrlByRouteNameAction() {
    return this.__replaceUrlByRouteNameAction
  }

  /**
   *
   * @return {ActionDispatcher<UrlPushed, UrlPushedBuilder>}
   */
  get urlPushed() {
    return this.__urlPushed
  }

  /**
   *
   * @return {ActionDispatcher<UrlReplaced, UrlReplacedBuilder>}
   */
  get urlReplaced() {
    return this.__urlReplaced
  }

  /**
   *
   * @return {ActionDispatcher<UrlChanged, UrlChangedBuilder>}
   */
  get urlChanged() {
    return this.__urlChanged
  }
}
