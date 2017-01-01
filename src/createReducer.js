import updeep from 'updeep'

const defaultUpdateCondition = ({ payload }) => {
  return !!(typeof payload === 'object')
}

export default function (initialState, updateConditon = defaultUpdateCondition) {
  return (state = initialState, action) => {
    if (!updateConditon(action)) {
      return state
    }
    return updeep(action.payload, state)
  }
}
