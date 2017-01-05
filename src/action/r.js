
function createUpdateFn (fn, ...input) {
  const updateFn = function (state) { return fn(state, ...input) }
  return updateFn
}

export default function r (fn) {
  return (...input) => createUpdateFn(fn, ...input)
}
