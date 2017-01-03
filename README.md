# 🍭 redux-candy 

*IMPORTANT:* This project maybe useful for development or toy but maybe not for produciton.

Generate redux [updeep](https://github.com/substantial/updeep) based reducer and actions.

[![npm](https://img.shields.io/npm/v/redux-candy.svg?style=flat-square)](https://www.npmjs.com/package/redux-candy)
[![Travis](https://img.shields.io/travis/inuscript/redux-candy.svg?style=flat-square)](https://travis-ci.org/inuscript/redux-candy)

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

You can show [real demo](https://inuscript.github.io/redux-candy/) and [example source](https://github.com/inuscript/redux-candy/tree/master/example)

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
const increment = createAction('INCREMENT', 'counter', (i) => i + 1 )
const decrement = createAction('DECREMENT', 'counter', (i) => i - 1 )

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
const listItemAppendAction = createAction('INCREMENT', 'someList', (oldList, value) => [...oldList, value]))
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
const action = actionCreator('value')
// or
const action = {
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

You can pass key-value action.

```js
const actionCreator = createAction('SOME_TYPE', (userName, value) => {
  return {
    user: {
      [userName]: value
    }
  }
})
const action = actionCreator('bob', 100)
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

Helper for create action for redux-candy reducer.
This actionCreator return [FSA compatible](https://github.com/acdlite/flux-standard-action) action.

### `createAction(actionType: String, targetProperty: String, [updateFunction: Function], [metaCreator: Function])`

Generate update targetProperty value action.

```js
const actionCreator = createAction('ACTION', 'bob', (state, input) => state + input)

// const initialState = { bob: 1 }
store.dispatch(actionCreator(10)))
// state:
// {
//   bob: 11 // 1 + 10
// }
```

`updateFunction` get arguments `(baseValue, ...inputs)`.

All action arguments pass to `updateFunction`. You can use that.

```js
const actionCreator = createAction('ACTION', 'bob', (state, input1, input2) => state + input1 + input2)

actionCreator(10, 20)
```


### `createAction(actionType: String, targetProperties: Array, [updateFunction: Function], [metaCreator: Function])`

Generate update targetProperty value action.

```js
// const initialState = { users: { bob: 1 } }
const complexActionCreator = createAction('ACTION', ['users', 'bob'], (state, val) => state + val)
store.dispatch(complexActionCreator(10)))
// state:
// {
//   users: {
//     bob: 11
//   }
// }
```

### `createAction(actionType: String, updateFunction: Function, [metaCreator: Function])`

Proxy [redux-action](https://github.com/acdlite/redux-actions#createactiontype-payloadcreator--identity-metacreator)

You can fully control payload.

```js
// const initialState = { bob: 1 }
const complexActionCreator = createAction('SOME_COMPLEX', (value, key) => {
  return {
    [key]: (i = 0) => (i + value)
  }
})
store.dispatch(complexActionCreator(10, 'bob')))
// state:
// {
//   bob: 11
// }

store.dispatch(complexActionCreator(10, 'bob')))
// state:
// {
//   bob: 1,
//   sam: 10
// }
```
