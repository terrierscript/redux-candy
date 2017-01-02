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
    const customCondition = (action) => {
      return action.type === 'DO_SWEET'
    }
    const notSweetAction = createAction('NOT_SWEET', 'foo')
    const sweetAction = createAction('DO_SWEET', 'foo')
    const mockReducer = createReducer({}, customCondition)
    const actualWithNot = mockReducer({ foo: 'baz' }, notSweetAction('not'))
    assert.deepEqual(actualWithNot, { foo: 'baz' }) // NOT change
    const actualWithSweet = mockReducer({ foo: 'baz' }, sweetAction('sweet'))
    assert.deepEqual(actualWithSweet, { foo: 'sweet' }) // NOT change
  })
  it('with complex actionCreator', () => {
    const complexActionCreator = createAction('SOME_COMPLEX', (value, key) => {
      return {
        users: {
          [key]: (i = 0) => (i + value)
        }
      }
    })
    const initialState = { users: { bob: 1 } }
    const actualState1 = emulateState(initialState, complexActionCreator(10, 'bob'))
    assert.deepEqual(actualState1, {
      users: {
        bob: 11
      }
    })
    const actualState2 = emulateState(initialState, complexActionCreator(10, 'sam'))
    assert.deepEqual(actualState2, {
      users: {
        bob: 1,
        sam: 10
      }
    })
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
  })
})
