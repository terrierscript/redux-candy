import { createAction } from 'redux-actions'

const identity = value => value

export default function (type, key, updateFunction = identity){
  const payloadCreator = (...params) => {
    return { [key]: updateFunction(...params) }
  }
  return createAction(type, payloadCreator)
}
