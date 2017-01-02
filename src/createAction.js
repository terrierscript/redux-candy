import isFunction from 'lodash/isFunction'
import isNull from 'lodash/isNull'
import invariant from 'invariant'

import compose from './compose'
import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'

const identity = v => v
const toArray = item => (Array.isArray(item)) ? item : [item]

const nestObjectHash = nest((key, fn, val) => {
  return { [key]: fn(val) }
})

const payloadCreatorInvariant = (payloadCreator) => {
  invariant(
    isFunction(payloadCreator) || isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null'
  )
  return payloadCreator
}

function generateCreateAction (options) {
  return function (type, property, payloadCreator = identity, metaCreator) {
    if (isFunction(property)) {
      return baseCreateAction(type, property, payloadCreator)
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
export const createAction = generateCreateAction({
  payloadCreatorWrapper: v => v
})

// createReducerAction
const reducerActionPayload = (fn) => {
  return function toPayloadCreator (...input) {
    return (state) => fn(state, ...input)
  }
}

export const createReducerAction = generateCreateAction({
  payloadCreatorWrapper: reducerActionPayload
})

