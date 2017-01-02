import { createReducer, createAction } from '../src'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

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

  it('update with plain action', () => {
    const actionCreator = (text) => ({
      type: 'ADD_TODO',
      payload: {
        todos: (todos) => [ ...todos, text ]
      }
    })
    const action = actionCreator('baz')
    const actualState = emulateState({ todos: ['foo'] }, action)
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })
})
