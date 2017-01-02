import { configureCreateAction } from '../src/createAction'
import nest from '../src/nest'
import assert from 'assert'

describe('configureCreateAction', () => {
  it('append custom action creator', () => {
    const customPropertyResolver = (property) => nest('someFixedValue', property)
    const customCreateAction = configureCreateAction(customPropertyResolver)
    const someActionCreator = customCreateAction('SOME_TYPE', 'baz')
    const action = someActionCreator('foo')
    assert.deepEqual(action, {
      type: 'SOME_TYPE',
      payload: {
        someFixedValue: {
          baz: 'foo'
        }
      }
    })
  })
})
