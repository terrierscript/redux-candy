import { createReducer, createAction } from '../src'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe('createAction', () => {
  it('with plain action', () => {
    const actionCreator = (text) => ({
      type: 'ADD_TODO',
      payload: {
        todos: (todos) => [ ...todos, text ]
      }
    })
    const actualState = emulateState({ todos: ['foo'] }, actionCreator('baz'))
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })

  it('createReduceAction', () => {
    const actionCreator = createAction('ADD_TODO', 'todos', (text) =>
      (todos) => [ ...todos, text ]
    )
    const actualState = emulateState({ todos: ['foo'] }, actionCreator('baz'))
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })

  it('params updator', () => {
    const actionCreator = createAction('ADD_TODO', 'todos', (text) => {
      return text
    })
    const action = actionCreator('baz')
    assert.deepEqual(action, {
      type: 'ADD_TODO',
      payload: { todos: 'baz' }
    })
  })

  it('replaceValue', () => {
    const actionCreator = createAction('ADD_TODO', 'someValue')
    const action = actionCreator('bee')
    assert.deepEqual(action, {
      type: 'ADD_TODO',
      payload: {
        someValue: 'bee'
      }
    })
    const actualState = emulateState({ someValue: 'zoo' }, action)
    assert.deepEqual(actualState, {
      someValue: 'bee'
    })
  })

  it('removeValue', () => {
    const actionCreator = createAction('ADD_TODO', 'someValue', () => {
      return undefined
    })
    const actualState = emulateState({ someValue: 'zoo', fooValue: 'boo' }, actionCreator())
    assert.deepEqual(actualState, {
      someValue: undefined,
      fooValue: 'boo'
    })
  })
})
