import * as reduxActions from 'redux-actions'
import nest from './nest'

function defaulResolveKeyFunction (key) {
  return nest(key)
}

export function configureCreateAction (resolveKeyFunction = defaulResolveKeyFunction) {
  return function (type, key, payloadCreator) {
    const _payloadCreator = resolveKeyFunction(key)(payloadCreator)
    return reduxActions.createAction(type, _payloadCreator)
  }
}

export const createAction = configureCreateAction()
