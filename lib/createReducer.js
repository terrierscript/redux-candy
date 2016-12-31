import updeep from 'updeep'

export default function(initialState) {
  return (state = initialState, { payload } ) => {
    if(typeof payload !== "object"){
      return state
    }
    return updeep(payload, state)
  }
}
