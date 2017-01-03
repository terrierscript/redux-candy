import isFunction from 'lodash/isFunction'
import isNull from 'lodash/isNull'
import invariant from 'invariant'

import compose from './compose'
import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'
import r from './r'

const toArray = item => (Array.isArray(item)) ? item : [item]

const nestObjectHash = nest((key, fn, ...val) => {
  return { [key]: fn(...val) }
})

const payloadCreatorInvariant = (payloadCreator) => {
  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  )
  return payloadCreator
}

function generateCreateAction (options) {
  return function (type, property, payloadCreator = options.defaultPayloadCreator, metaCreator) {
    if (isFunction(property)) {
      const [ swapPayloadCreator, swapMetaCreator ] = [property, payloadCreator]
      return baseCreateAction(type, swapPayloadCreator, swapMetaCreator)
    }
    property = toArray(property)

    // check payloadCreator
    payloadCreatorInvariant(payloadCreator)

    const convertPayload = compose(
      nestObjectHash(...property),
      options.payloadCreatorWrapper,
    )
    const wrappedPayloadCreator = convertPayload(payloadCreator)
    return baseCreateAction(type, wrappedPayloadCreator, metaCreator)
  }
}

// createAction
// export const createActionPure = generateCreateAction({
//   defaultPayloadCreator: v => v,
//   payloadCreatorWrapper: v => v
// })

export const createAction = generateCreateAction({
  defaultPayloadCreator: (state, v) => v,
  payloadCreatorWrapper: r
})
