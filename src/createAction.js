import * as reduxActions from 'redux-actions'
import nest from './nest'

function defaultPropertyResolver (property) {
  if (Array.isArray(property)) {
    return nest(...property)
  }
  return nest(property)
}

function baseCreateAction ({ type, payloadCreator, metaCreator }) {
  return reduxActions.createAction(type, payloadCreator, metaCreator)
}

export function configureCreateAction (propertyResolver = defaultPropertyResolver) {
  return function (type, property, payloadCreator, metaCreator) {
    if (typeof property === 'function') {
      return baseCreateAction({
        type,
        // swap params
        payloadCreator: property,
        metaCreator: payloadCreator
      })
    }

    return baseCreateAction({
      type,
      payloadCreator: propertyResolver(property)(payloadCreator),
      metaCreator
    })
  }
}

export const createAction = configureCreateAction()
