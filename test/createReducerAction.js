import diff from 'jest-diff'

import { createAction } from 'redux-actions'
import { createReducer, createReducerAction } from './index'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

it("with plain action", () => {
  const actionCreator = (text) => ({
    type: 'ADD_TODO',
    payload: {
      todos: (todos) => [ ...todos, text ]
    }
  })
  const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
  expect(actualState).toEqual({
    todos: ["foo", "baz"]
  })
})

it("with redux-actions/createAction", () => {
  const actionCreator = createAction('ADD_TODO', (text) => ({
    todos: (todos) => {
      return [ ...todos, text ]
    }
  }) )
  const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
  expect(actualState).toEqual({
    todos: ["foo", "baz"]
  })
})

it("createReduceAction", () => {
  const actionCreator = createReducerAction('ADD_TODO', 'todos', (text) => (
    (todos) => [ ...todos, text ]
  ))
  const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
  expect(actualState).toEqual({
    todos: ["foo", "baz"]
  })
})

it("replaceValue", () => {
  const actionCreator = createReducerAction('ADD_TODO', 'someValue')
  const actualState = emulateState({ someValue: "zoo" }, actionCreator("bee"))
  expect(actualState).toEqual({
    someValue: "bee"
  })
})

it("removeValue", () => {
  const actionCreator = createReducerAction('ADD_TODO', 'someValue', () => {
    return undefined
  })
  const actualState = emulateState({ someValue: "zoo", fooValue: "boo" }, actionCreator())
  expect(actualState).toEqual({
    someValue: undefined,
    fooValue: "boo"
  })
})