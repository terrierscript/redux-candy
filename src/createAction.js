import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'

function defaultPropertyResolver (property) {
  if (Array.isArray(property)) {
    return nest(...property)
  }
  return nest(property)
}

export function configureCreateAction (propertyResolver = defaultPropertyResolver) {
  return function wrapCreateAction (type, property, payloadCreator, ...rest) {
    const _payloadCreator = propertyResolver(property)(payloadCreator)
    return baseCreateAction(type, _payloadCreator, ...rest)
  }
}

export const createAction = configureCreateAction()
