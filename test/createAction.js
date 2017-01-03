import { createAction } from '../src'
import assert from 'assert'
import updeep from 'updeep'

const resolveAction = action => {
  return updeep({ payload: action.payload}, action)
}

const assertAction = (action, expected) => {
  assert.deepEqual(resolveAction(action), expected)
}

describe('createAction', () => {
  it('params updator', () => {
    const actionCreator = createAction('ADD_TODO', 'todos', (text) => {
      return text
    })
    const action = actionCreator('baz')
    assertAction(action, {
      type: 'ADD_TODO',
      payload: { todos: 'baz' }
    })
  })
  it('replaceValue', () => {
    const actionCreator = createAction('ADD_TODO', 'someValue')
    const action = actionCreator('bee')
    assertAction(action, {
      type: 'ADD_TODO',
      payload: {
        someValue: 'bee'
      }
    })
  })
  it('update mutation', () => {
    const actionCreator = createAction('ADD_TODO', 'todos',
      (text) => (todos) => [ ...todos, text ]
    )
    const action = actionCreator('baz')
    assert.equal(action.type, 'ADD_TODO')
    assert.equal(typeof action.payload.todos, 'function')
  })
  it('with metaCreator', () => {
    const actionCreator = createAction('ADD_TODO', 'someValue', (value) => {
      return { value }
    }, (_, metaValue) => {
      return { metaValue }
    })
    const action = actionCreator('a', 'b')
    assertAction(action, {
      type: 'ADD_TODO',
      payload: { someValue: { value: 'a' } },
      meta: { metaValue: 'b' }
    })
  })
  it('nest property', () => {
    const actionCreator = createAction('SOME_TYPE', ['a', 'b', 'c'])
    const action = actionCreator('value')
    assertAction(action, {
      type: 'SOME_TYPE',
      payload: {
        a: {
          b: {
            c: 'value'
          }
        }
      }
    })
  })
  it('functional (full controlled)', () => {
    const actionCreator = createAction('SOME_TYPE', (value, key) => {
      return { [key]: value }
    }, (value, key, meta) => {
      return meta + value + key
    })
    const action = actionCreator('baz', 'foo', 'bee')
    assertAction(action, {
      type: 'SOME_TYPE',
      payload: {
        'foo': 'baz'
      },
      meta: 'beebazfoo'
    })
  })
  it('throw', () => {
    assert.throws(
      () => createAction('ADD_TODO', 'someValue', 'foo'),
      'Expected payloadCreator to be a function, undefined or null'
    )
  })
})
