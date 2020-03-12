/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlExchanger} from '../js/UrlExchanger'
import {ApplicationBuilder, Dispatcher} from '@flexio-oss/hotballoon'
import {StandAloneHistoryClient} from '@flexio-oss/js-history-client'
import {RouterBuilder} from '@flexio-oss/js-router'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FakeLogger} from '@flexio-oss/js-logger'
import '../../generated/io/package'
import '@flexio-oss/extended-flex-types'

const assert = require('assert')

const historyStateObject = {hello: '1', budy: '2'}
const historyStateObjectValue = globalFlexioImport.io.flexio.flex_types.ObjectValueBuilder.fromObject({
  hello: '1',
  budy: '2'
}).build()


export class UrlExchangerTest extends TestCase {
  setUp() {
    this.router = RouterBuilder.build(
      RouterBuilder.urlConfigurationBuilder()
        .hostname('toto.fr')
        .protocol('https')
        .build()
    )

    this.historyClient = new StandAloneHistoryClient()
    const logger = new FakeLogger()

    this.app = new ApplicationBuilder()
      .id('test')
      .dispatcher(new Dispatcher(logger))
      .logger(logger)
      .build()

    this.urlExchanger = new UrlExchanger(
      this.historyClient,
      this.router,
      new Dispatcher(new FakeLogger()),
      this.app.addComponentContext()
    )
  }

  /**
   *
   * @return {FlexUrl}
   * @private
   */
  __addRoute1() {
    const route = this.router.routeBuilder()
      .name('route1')
      .urlTemplate('/bibi/bubu/{id}')
      .build()

    this.router.addRoute(route)

    return new globalFlexioImport.io.flexio.extended_flex_types
      .FlexUrlBuilder()
      .value('https://toto.fr/bibi/bubu/3')
      .build()
  }

  testListenPushedByUrl() {
    const expectedUrl = new globalFlexioImport.io.flexio.extended_flex_types
      .FlexUrlBuilder()
      .value('https://toto.fr/bibi')
      .build()

    let urlPushed = null
    let urlChanged = null

    this.urlExchanger
      .listenUrlPushed(
        /**
         *
         * @param {UrlPushed} urlPushedPayload
         */
        (urlPushedPayload) => {
          urlPushed = urlPushedPayload.url()
        })

    this.urlExchanger
      .listenUrlChanged(
        /**
         *
         * @param {UrlChanged} urlChangedPayload
         */
        (urlChangedPayload) => {
          urlChanged = urlChangedPayload.url()
        })

    this.urlExchanger
      .dispatchPushUrlByUrl(expectedUrl, historyStateObject)

    assert.deepEqual(urlPushed, expectedUrl, 'url should be pushed')
    assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')
    assert.deepEqual(
      this.historyClient.state(),
      this.historyClient.historyStateBuilder()
        .url(expectedUrl)
        .state(historyStateObjectValue)
        .build(),
      'history state should be updated'
    )
    assert.strictEqual(this.historyClient.length(), 2, 'history state should be pushed')
  }

  testListenPushedByRoute() {
    const expectedUrl = this.__addRoute1()

    let urlPushed = null
    let urlChanged = null

    this.urlExchanger
      .listenUrlPushed(
        /**
         *
         * @param {UrlPushed} urlPushedPayload
         */
        (urlPushedPayload) => {
          urlPushed = urlPushedPayload.url()
        })

    this.urlExchanger
      .listenUrlChanged(
        /**
         *
         * @param {UrlChanged} urlChangedPayload
         */
        (urlChangedPayload) => {
          urlChanged = urlChangedPayload.url()
        })

    this.urlExchanger
      .dispatchPushUrlByRouteName(
        'route1',
        {id: '3'},
        historyStateObject
      )

    assert.deepEqual(urlPushed, expectedUrl, 'url should be pushed')
    /*assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')
    assert.deepEqual(
      this.historyClient.state(),
      this.historyClient.historyStateBuilder()
        .url(expectedUrl)
        .state(historyStateObject)
        .build(),
      'history state should be updated'
    )
    assert.strictEqual(this.historyClient.length(), 2, 'history state should be pushed')*/
  }

  testListenReplacedByUrl() {
    const expectedUrl = new globalFlexioImport.io.flexio.extended_flex_types
      .FlexUrlBuilder()
      .value('https://toto.fr/bibi')
      .build()

    let urlReplaced = null
    let urlChanged = null

    this.urlExchanger
      .listenUrlReplaced(
        /**
         *
         * @param {UrlReplaced} urlReplacedPayload
         */
        (urlReplacedPayload) => {
          urlReplaced = urlReplacedPayload.url()
        })

    this.urlExchanger
      .listenUrlChanged(
        /**
         *
         * @param {UrlChanged} urlChangedPayload
         */
        (urlChangedPayload) => {
          urlChanged = urlChangedPayload.url()
        })

    this.urlExchanger
      .dispatchReplaceUrlByUrl(expectedUrl, historyStateObject)

    assert.deepEqual(urlReplaced, expectedUrl, 'url should be replaced')
    assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')

    assert.deepEqual(this.historyClient.state().url(), expectedUrl, 'history url should be updated')
    assert.deepEqual(this.historyClient.state().state().toObject(), historyStateObjectValue.toObject(), 'history state should be updated')

    assert.strictEqual(this.historyClient.length(), 1, 'history state should be replaced')

  }

  testListenReplacedByRoute() {
    const expectedUrl = this.__addRoute1()

    let urlReplaced = null
    let urlChanged = null

    this.urlExchanger
      .listenUrlReplaced(
        /**
         *
         * @param {UrlReplaced} urlReplacedPayload
         */
        (urlReplacedPayload) => {
          urlReplaced = urlReplacedPayload.url()
        })

    this.urlExchanger
      .listenUrlChanged(
        /**
         *
         * @param {UrlChanged} urlChangedPayload
         */
        (urlChangedPayload) => {
          urlChanged = urlChangedPayload.url()
        })

    this.urlExchanger
      .dispatchReplaceUrlByRouteName(
        'route1',
        {id: '3'},
        historyStateObject
      )

    assert.deepEqual(urlReplaced, expectedUrl, 'url should be replaced')
    assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')

    assert.deepEqual(this.historyClient.state().url(), expectedUrl, 'history url should be updated')
    assert.deepEqual(this.historyClient.state().state().toObject(), historyStateObjectValue.toObject(), 'history state should be updated')

    assert.strictEqual(this.historyClient.length(), 1, 'history state should be replaced')
  }
}

runTest(UrlExchangerTest)
