/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {UrlExchanger} from '../js/UrlExchanger'
import {Dispatcher} from '@flexio-oss/hotballoon'
import {StandAloneHistoryClient} from '@flexio-oss/js-history-client'
import {RouterBuilder} from '@flexio-oss/js-router'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FakeLogger} from '@flexio-oss/js-logger'
import '../../generated/io/package'
import '@flexio-oss/extended-flex-types'

const assert = require('assert')

const historyStateObjectValue = {hello: 1, budy: 2}

export class UrlExchangerTest extends TestCase {
  setUp() {

    this.router = RouterBuilder.build(
      RouterBuilder.urlConfigurationBuilder()
        .hostname('toto.fr')
        .protocol('https')
        .build()
    )

    this.historyClient = new StandAloneHistoryClient()

    this.urlExchanger = new UrlExchanger(
      this.historyClient,
      this.router,
      new Dispatcher(new FakeLogger())
    )

  }

  /**
   *
   * @return {FlexUrl}
   * @private
   */
  __addRoute1() {
    this.router
      .addRoute(
        this.router.routeBuilder()
          .build(
            'route1',
            'bibi/bubu/{id}'
          )
      )

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
      .dispatchPushUrlByUrl(expectedUrl, historyStateObjectValue)

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
    assert(this.historyClient.length() === 2, 'history state should be pushed')
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
        {id: 3},
        historyStateObjectValue
      )

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
    assert(this.historyClient.length() === 2, 'history state should be pushed')
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
      .dispatchReplaceUrlByUrl(expectedUrl, historyStateObjectValue)

    assert.deepEqual(urlReplaced, expectedUrl, 'url should be replaced')
    assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')
    assert.deepEqual(
      this.historyClient.state(),
      this.historyClient.historyStateBuilder()
        .url(expectedUrl)
        .state(historyStateObjectValue)
        .build(),
      'history state should be updated'
    )
    assert(this.historyClient.length() === 1, 'history state should be replaced')

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
        {id: 3},
        historyStateObjectValue
      )

    assert.deepEqual(urlReplaced, expectedUrl, 'url should be replaced')
    assert.deepEqual(urlChanged, expectedUrl, 'url should be changed')
    assert.deepEqual(
      this.historyClient.state(),
      this.historyClient.historyStateBuilder()
        .url(expectedUrl)
        .state(historyStateObjectValue)
        .build(),
      'history state should be updated'
    )
    assert(this.historyClient.length() === 1, 'history state should be replaced')
  }
}

runTest(UrlExchangerTest)
