import { createAction as baseCreateAction } from 'redux-actions'
import nest from './nest'

function defaultPropertyResolver(key){
  return nest(key)
}

export function configureCreateAction (propertyResolver = defaultPropertyResolver) {
  return function wrapCreateAction (type, key, payloadCreator) {
    const _payloadCreator = propertyResolver(key)(payloadCreator)
    return baseCreateAction(type, _payloadCreator)
  }
}

export const createAction = configureCreateAction()
