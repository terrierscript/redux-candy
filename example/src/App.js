import React, { Component } from 'react';
import Counter from './Counter'
import Todo from './Todo'
class App extends Component {
  render() {
    return <div>
      <h1>redux-candy Example</h1>
      <h2>Counter Example</h2>
      <Counter />
      <hr />
      <h2>Todo Example</h2>
      <Todo />
      <hr />
      <a href="//github.com/inuscript/redux-candy">Source</a>
    </div>
  }
}

export default App;
