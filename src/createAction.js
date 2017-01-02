import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'

function defaultPropertyResolver (key) {
  if (Array.isArray(key)) {
    return nest(...key)
  }
  return nest(key)
}

export function configureCreateAction (propertyResolver = defaultPropertyResolver) {
  return function wrapCreateAction (type, key, payloadCreator, ...rest) {
    const _payloadCreator = propertyResolver(key)(payloadCreator)
    return baseCreateAction(type, _payloadCreator, ...rest)
  }
}

export const createAction = configureCreateAction()
