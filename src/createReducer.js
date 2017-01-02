import updeep from 'updeep'
import { isFSA } from 'flux-standard-action'

const defaultCondition = (action) => {
  return true
}

const isObjectPayload = (action) => (action && typeof action.payload === 'object')

export default function createReducer (initialState, updateActionCondition = defaultCondition) {
  return (state = initialState, action) => {
    if (!updateActionCondition(action)) {
      return state
    }

    if (!isFSA(action)) {
      return state
    }

    if (!isObjectPayload(action)) {
      return state
    }

    return updeep(action.payload, state)
  }
}
