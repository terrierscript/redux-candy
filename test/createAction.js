import { createReducer, createAction } from '../lib'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe("createAction", () => {
  it("with plain action", () => {
    const actionCreator = (text) => ({
      type: 'ADD_TODO',
      payload: {
        todos: (todos) => [ ...todos, text ]
      }
    })
    const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
    assert.deepEqual(actualState, {
      todos: ["foo", "baz"]
    })
  })

  it("createReduceAction", () => {
    const actionCreator = createAction('ADD_TODO', 'todos', (text) => (
      (todos) => [ ...todos, text ]
    ))
    const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
    assert.deepEqual(actualState, {
      todos: ["foo", "baz"]
    })
  })

  it("replaceValue", () => {
    const actionCreator = createAction('ADD_TODO', 'someValue')
    const actualState = emulateState({ someValue: "zoo" }, actionCreator("bee"))
    assert.deepEqual(actualState, {
      someValue: "bee"
    })
  })

  it("removeValue", () => {
    const actionCreator = createAction('ADD_TODO', 'someValue', () => {
      return undefined
    })
    const actualState = emulateState({ someValue: "zoo", fooValue: "boo" }, actionCreator())
    assert.deepEqual(actualState, {
      someValue: undefined,
      fooValue: "boo"
    })
  })
})