import { createAction } from 'redux-actions'
import nest from './nest'
const identity = value => value

export default function (type, key, updateFunction = identity) {
  const payloadCreator = nest(key)(updateFunction)
  return createAction(type, payloadCreator)
}
