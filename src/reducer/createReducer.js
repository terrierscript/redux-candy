import updeep from 'updeep'
import { isFSA } from 'flux-standard-action'

const defaultFilter = (action) => {
  return true
}

const isObjectPayload = (action) => (action && typeof action.payload === 'object')

export default function createReducer (initialState, actionFilter = defaultFilter) {
  return (state = initialState, action) => {
    if (!actionFilter(action)) {
      return state
    }

    if (!isFSA(action)) {
      return state
    }
    const { payload, meta } = action
    // if (!isObjectPayload(action)) {
    //   return state
    // }
    if (typeof meta.update !== "function"){
      return state
    }
    return updeep(meta.update(payload), state)
  }
}
