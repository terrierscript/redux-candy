import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import updeep from 'updeep'
import { createReducer, createReducerAction } from 'createReducer'

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

class App extends Component {
  constructor(){
    super()
    this.store = createStore(reducer)
  }
  render() {
    return (
      <Provider store={this.store}>
        <CounterContainer />
      </Provider>
    );
  }
}

export default App;
