import { createAction } from 'redux-actions'
import { createReducer, createReducerAction } from '../lib'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}
describe("redux-sweet", () => {
  describe("createReducer", () => {
    it("updateCondtion", () => {
      const updateOnlyBeeType = ( action ) => {
        return action.type === "DO_SWEET"
      }
      const notSweetAction = createReducerAction("NOT_SWEET", "foo")
      const sweetAction = createReducerAction("DO_SWEET", "foo")
      const mockReducer = createReducer({}, updateOnlyBeeType)
      const actualWithNot = mockReducer({ foo: "baz"}, notSweetAction("not"))
      assert.deepEqual(actualWithNot, { foo: "baz"} ) // NOT change
      const actualWithSweet = mockReducer({ foo: "baz"}, sweetAction("sweet"))
      assert.deepEqual(actualWithSweet, { foo: "sweet"} ) // NOT change
    })
  })

  describe("createReducerAction", () => {
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

    it("with redux-actions/createAction", () => {
      const actionCreator = createAction('ADD_TODO', (text) => ({
        todos: (todos) => {
          return [ ...todos, text ]
        }
      }) )
      const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
      assert.deepEqual(actualState, {
        todos: ["foo", "baz"]
      })
    })

    it("createReduceAction", () => {
      const actionCreator = createReducerAction('ADD_TODO', 'todos', (text) => (
        (todos) => [ ...todos, text ]
      ))
      const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
      assert.deepEqual(actualState, {
        todos: ["foo", "baz"]
      })
    })

    it("replaceValue", () => {
      const actionCreator = createReducerAction('ADD_TODO', 'someValue')
      const actualState = emulateState({ someValue: "zoo" }, actionCreator("bee"))
      assert.deepEqual(actualState, {
        someValue: "bee"
      })
    })

    it("removeValue", () => {
      const actionCreator = createReducerAction('ADD_TODO', 'someValue', () => {
        return undefined
      })
      const actualState = emulateState({ someValue: "zoo", fooValue: "boo" }, actionCreator())
      assert.deepEqual(actualState, {
        someValue: undefined,
        fooValue: "boo"
      })
    })
  })
})