import { createReducer } from '../src'
import { createReducerAction } from '../src/createAction'
import assert from 'assert'
import updeep from 'updeep'

const uncurryAction = (action) => {
  return updeep({ payload: action.payload}, action)
}

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
    const initialState = {
      user: {
        'bob': 10,
        'sam': 20
      }
    }
    const actionCreator = createReducerAction('SOME_TYPE', 'user', (state, userName, value) => {
      return Object.assign({}, state, {
        [userName]: value
      })
    })
    const action = actionCreator('bob', 100)
    const actualState = emulateState(initialState, action)
    assert.deepEqual(actualState, {
      user: {
        'bob': 100,
        'sam': 20
      }
    })
  })
})
