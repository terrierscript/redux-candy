# 🍭 redux-candy (HIGHLY EXPERIMENTAL)

*IMPORTANT:* This project maybe useful for development or toy but maybe not for produciton.

Generate redux [updeep](https://github.com/substantial/updeep) based reducer and actions.

[![npm](https://img.shields.io/npm/v/redux-candy.svg)]()

## Installation

```
$ npm install redux-candy
```

```
$ yarn add redux-candy
```


## Example

```js
const initialState = {
  counter: 0
}
const reducer = createReducer(initialState)

// counter
const increment = createAction('INCREMENT', 'counter', () => ( (i) => i + 1 ))
const decrement = createAction('DECREMENT', 'counter', () => ( (i) => i - 1 ))

const Counter = ({dispatch, counter}) => {
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  )
}

const CounterContainer = connect(state => state)(Counter)
const store = createStore(reducer)
const App = () => (
  <Provider store={store}>
    <CounterContainer />
  </Provider>
)
```
# Usage

redux-candy provide very stupid reducer that apply passed action.

```js
const initialState = {
  counter: 0
}
const reducer = createReducer(initialState)
```

And you must pass action that has update function

```js
// counter
const increment = createAction('INCREMENT', 'counter', () => ( (i) => i + 1 ))
const decrement = createAction('DECREMENT', 'counter', () => ( (i) => i - 1 ))

```

You can pass plain action like this.

```js
const increment = () => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    counter: () => ( (i) => i + 1 )
  }
}
```

If you want replace value

```js
const replaceValueAction = createAction('INCREMENT', 'someValue')
// or
const replaceValueAction = (value) => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    someValue: value
  }
}
```

You can mutate oldValue

```js
const listItemAppendAction = createAction('INCREMENT', 'someList', (oldList) => [...oldList, value])
// or
const listItemAppendAction = (value) => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    someList: (oldList) => [...oldList, value]
  }
}
```

You can pass nested property.

```js
const actionCreator = createAction('SOME_TYPE', ['a', 'b', 'c'])
// or
const action = actionCreator('value')
assert.deepEqual(action, {
  type: 'SOME_TYPE',
  payload: {
    a: {
      b: {
        c: 'value'
      }
    }
  }
})
```


# API
## Reducer

### `createReducer(initialState: Object, [actionFilter: Function])`

Generate updeep based rootReducer.
This reducer accept all action and return `updeep(action.payload, state)`.

This reducer ignore below action too.

* Not [flux standard action](https://github.com/acdlite/flux-standard-action).
* Non object type payload action.
  * Ignore action example: `{ type:"TYPE", payload: "someValue" }`

If you want controll update condition, pass `actionFilter`

```js
const updateCondition = ( action ) => {
  // update when pass SOME_ACTION
  return action.type === "SOME_ACTION"
}
```


## Action

### `createAction(actionType: String, targetProperty: (String | Array), [updateFunction: Function], [metaCreator: Function])`

Helper for create action for redux-sweeet reducer.
This actionCreator return [FSA compatible](https://github.com/acdlite/flux-standard-action) action.

### `createAction(actionType: String, updateFunction: Function, [metaCreator: Function])`

Proxy [redux-action](https://github.com/acdlite/redux-actions#createactiontype-payloadcreator--identity-metacreator)