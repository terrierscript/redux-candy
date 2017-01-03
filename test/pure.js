import { createAction } from '../src/pure'
import assert from 'assert'
import updeep from 'updeep'

describe('pure', () => {
  it('params updator', () => {
    const actionCreator = createAction('ADD', 'someValue', (a, b, c) => (base) => {
      return base + a + b + c
    })
    const action = actionCreator(1, 2, 3)
    const result = updeep(action.payload, { someValue: 4} )
    assert.deepEqual(action.type, "ADD")
    assert.deepEqual(result, {
      someValue: 10 // 4 + 1 + 2 + 3
    })
  })
})