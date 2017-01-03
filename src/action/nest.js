import compose from './compose'

const resolve = (key, convert) => {
  return (payloadCreator) => (...input) => {
    return convert(key, payloadCreator, ...input)
  }
}

export const nest = (convert) => {
  return (...keys) => {
    const nestFuncs = keys.map(
      (key) => resolve(key, convert)
    )
    return compose(...nestFuncs)
  }
}

export default nest
