import React, { Component } from 'react';
import Counter from './Counter'
import Todo from './Todo'
class App extends Component {
  render() {
    return <div>
      <h1>Counter Example</h1>
      <Counter />
      <hr />
      <h1>Todo Example</h1>
      <Todo />
    </div>
  }
}

export default App;
