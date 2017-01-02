import { createReducer, createAction } from '../src'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe('createReducer', () => {
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
  it('with createAction', () => {
    const actionCreator = createAction('ADD_TODO', 'todos',
      (text) => (todos) => [ ...todos, text ]
    )
    const action = actionCreator('baz')
    const actualState = emulateState({ todos: ['foo'] }, action)
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })

  it('replaceValue', () => {
    const actionCreator = createAction('ADD_TODO', 'someValue')
    const action = actionCreator('bee')
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

  it('configure updateCondtion', () => {
    const ignoreActionCondition = (action) => {
      return action.type !== 'DO_SWEET'
    }
    const notSweetAction = createAction('NOT_SWEET', 'foo')
    const sweetAction = createAction('DO_SWEET', 'foo')
    const mockReducer = createReducer({}, ignoreActionCondition)
    const actualWithNot = mockReducer({ foo: 'baz' }, notSweetAction('not'))
    assert.deepEqual(actualWithNot, { foo: 'baz' }) // NOT change
    const actualWithSweet = mockReducer({ foo: 'baz' }, sweetAction('sweet'))
    assert.deepEqual(actualWithSweet, { foo: 'sweet' }) // NOT change
  })

  describe('ignore update', () => {
    it('payload is string', () => {
      const invalidAction = {
        type: 'ADD_TODO',
        payload: 'hoge'
      }
      const actualState = emulateState({ foo: 'baz' }, invalidAction)
      assert.deepEqual(actualState, {
        foo: 'baz'
      })
    })
    it('payload is invalid FSAction', () => {
      const nonFSAaction = {
        type: 'ADD_TODO',
        payload: {
          foo: 'zee'
        },
        nonFsaProps: 'value'
      }
      const actualState = emulateState({ foo: 'baz'}, nonFSAaction)
      assert.deepEqual(actualState, {
        foo: 'baz'
      })
    })
    it('payload is undefined', () => {
      const actualState = emulateState({ foo: 'baz'}, undefined)
      assert.deepEqual(actualState, {
        foo: 'baz'
      })
    })
  })
})
