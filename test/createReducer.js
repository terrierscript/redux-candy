import { createReducer, createAction } from '../src'
import assert from 'assert'

describe('createReducer', () => {
  it('updateCondtion', () => {
    const updateOnlyBeeType = (action) => {
      return action.type === 'DO_SWEET'
    }
    const notSweetAction = createAction('NOT_SWEET', 'foo')
    const sweetAction = createAction('DO_SWEET', 'foo')
    const mockReducer = createReducer({}, updateOnlyBeeType)
    const actualWithNot = mockReducer({ foo: 'baz' }, notSweetAction('not'))
    assert.deepEqual(actualWithNot, { foo: 'baz' }) // NOT change
    const actualWithSweet = mockReducer({ foo: 'baz' }, sweetAction('sweet'))
    assert.deepEqual(actualWithSweet, { foo: 'sweet' }) // NOT change
  })
})
