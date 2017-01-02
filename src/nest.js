const identity = value => value

function flat (key, payloadCreator = identity) {
  return function (...params) {
    return { [key]: payloadCreator(...params) }
  }
}

// port from redux
function compose (...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default function nest (...keys) {
  const nestFuncs = keys.map(
    (key) => (updateFunction) => flat(key, updateFunction)
  )
  return compose(...nestFuncs)
}
