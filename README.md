# redux-candy 🍭
*HIGHLY EXPERIMENTAL :* This project useful for development or toy but maybe not for produciton.

Generate redux [updeep](https://github.com/substantial/updeep) based reducer and actions.

## Example

```js
const initialState = {
  counter: 0
}
const reducer = createReducer(initialState)

// counter
const increment = createReducerAction('INCREMENT', 'counter', () => ( (i) => i + 1 ))
const decrement = createReducerAction('DECREMENT', 'counter', () => ( (i) => i - 1 ))

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

## API
### `createReducer(initialState: Object, [updateCondtion: Function])`

Generate updeep based rootReducer.
This reducer accept all action and return `updeep(action.payload, state)`.

If you want updeep only 