import { createReducer, createReducerAction } from '../src'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe('createReducerAction', () => {
  it('resolve createReducerAction', () => {
    const actionCreator = createReducerAction('TODO', 'todos', (baseTodo, input) => {
      return [...baseTodo, input]
    })
    const action = actionCreator('baz')
    const actualState = emulateState({ todos: ['foo'] }, action)
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })
  it('with null function', () => {
    const actionCreator = createReducerAction('ACTION', 'value')
    const action = actionCreator('baz')
    const actualState = emulateState({ value: 'bee' }, action)
    assert.deepEqual(actualState, {
      value: 'baz'
    })
  })
  it('override state', () => {
    const actionCreator = createReducerAction('SOME_TYPE', 'user', (state, userName, value) => {
      return {
        [userName]: value
      }
    })
    const action = actionCreator('bob', 100)
    const actualState = emulateState({
      user: {
        'bob': 10,
        'sam': 20
      }
    }, action)
    assert.deepEqual(actualState, {
      user: {
        'bob': 100
      }
    })
  })
})
