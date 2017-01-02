import assert from 'assert'
import { nest } from '../src'

const identity = v => v

describe('nest', () => {
  it('nest', () => {
    const nestFn = nest('some_key')(identity)
    assert.deepEqual(nestFn('foo'), {
      some_key: 'foo'
    })
  })
  it('nest / nest', () => {
    const nesfFn = nest('some_key', 'nested')(identity)
    assert.deepEqual(nesfFn('foo'), {
      some_key: {
        nested: 'foo'
      }
    })
  })
  it('nest / nest / nest', () => {
    const nesfFn = nest('some_key', 'child', 'descendant')(identity)
    assert.deepEqual(nesfFn('foo'), {
      some_key: {
        child: {
          descendant: 'foo'
        }
      }
    })
  })
})
