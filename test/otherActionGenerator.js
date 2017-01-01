import * as reduxActions from 'redux-actions'
import * as reduxAct from 'redux-act'
import assert from 'assert'

import { createReducer, createAction } from '../src'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe('with other library', function () {

  it("with redux-actions/createAction", () => {
    const actionCreator = reduxActions.createAction('ADD_TODO', (text) => ({
      todos: (todos) => {
        return [ ...todos, text ]
      }
    }) )
    const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
    assert.deepEqual(actualState, {
      todos: ["foo", "baz"]
    })
  })
  it("with redux-act/createAction", () => {
    const actionCreator = reduxAct.createAction((text) => ({
      todos: (todos) => {
        return [ ...todos, text ]
      }
    }) )
    const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
    assert.deepEqual(actualState, {
      todos: ["foo", "baz"]
    })
  })
});