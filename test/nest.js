import assert from 'assert'
import nestGenerator from '../src/nest'

const identity = v => v
const nest = nestGenerator( (key, fn, val) => {
  return [key , fn(val)]
})

describe('nest', () => {
  it('nest', () => {
    const nestFn = nest('some_key')(identity)
    assert.deepEqual(nestFn('foo'), ["some_key", 'foo' ])
  })
  it('nest / nest', () => {
    const nesfFn = nest('some_key', 'nested')(identity)
    assert.deepEqual(nesfFn('foo'), ["some_key", ["nested", 'foo'] ] )
  })
  it('nest / nest / nest', () => {
    const nesfFn = nest('some_key', 'child', 'descendant')(identity)
    assert.deepEqual(nesfFn('foo'), ["some_key",  ["child",  ["descendant", 'foo'] ] ])
  })
})
