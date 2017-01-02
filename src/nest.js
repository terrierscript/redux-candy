import compose from './compose'

const curried = (key, convert) => {
  return (payloadCreator) => (...input) => {
    return convert(key, payloadCreator, ...input)
  }
}

export const nest = (convert) => {
  return (...keys) => {
    const nestFuncs = keys.map(
      (key) => curried(key, convert)
    )
    return compose(...nestFuncs)
  }
}

export default nest
