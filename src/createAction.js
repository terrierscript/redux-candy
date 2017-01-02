import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'

function defaultPropertyResolver (property) {
  if (Array.isArray(property)) {
    return nest(...property)
  }
  return nest(property)
}

export function configureCreateAction (propertyResolver = defaultPropertyResolver) {
  return function wrapCreateAction (type, property, payloadCreator, metaCreator) {
    const wrappedPayloadCreator = propertyResolver(property)(payloadCreator)
    return baseCreateAction(type, wrappedPayloadCreator, metaCreator)
  }
}

export const createAction = configureCreateAction()
