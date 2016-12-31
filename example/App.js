import React, { Component } from 'react';
import Counter from './Counter'
import Todo from './Todo'
class App extends Component {
  render() {
    return <div>
      <Counter />
      <hr />
      <Todo />
    </div>
  }
}

export default App;
