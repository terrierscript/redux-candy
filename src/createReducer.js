import updeep from 'updeep'
import { isFSA } from 'flux-standard-action'

const emptyCondition = (action) => false
export default function createReducer (initialState, ignoreCondition = emptyCondition) {
  return (state = initialState, action) => {
    if (!isFSA(action)) {
      return state
    }
    if (typeof action.payload !== 'object') {
      return state
    }
    if (ignoreCondition(action)) {
      return state
    }
    return updeep(action.payload, state)
  }
}
