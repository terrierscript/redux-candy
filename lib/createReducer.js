import updeep from 'updeep'

export default function(initialState) {
  return (state = initialState, { payload, meta } ) => {
    if(typeof payload !== "object"){
      return state
    }
    return updeep(payload, state)
  }
}
