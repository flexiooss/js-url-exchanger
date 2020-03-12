PushUrlByUrlAction:
  url:
    $value-object: io.flexio.extended_flex_types.FlexUrl
  historyState: object

PushUrlByRouteNameAction:
  name: string
  parameters: object
  historyState: object

ReplaceUrlByUrlAction:
  url:
    $value-object: io.flexio.extended_flex_types.FlexUrl
  historyState: object

ReplaceUrlByRouteNameAction:
  name: string
  parameters: object
  historyState: object

UrlPushed:
  url:
    $value-object: io.flexio.extended_flex_types.FlexUrl

UrlReplaced:
  url:
    $value-object: io.flexio.extended_flex_types.FlexUrl

UrlChanged:
  url:
    $value-object: io.flexio.extended_flex_types.FlexUrl
