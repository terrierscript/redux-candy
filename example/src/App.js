import React, { Component } from 'react';
import Counter from './Counter'
import Todo from './Todo'

const baseUrl = "https://github.com/inuscript/redux-candy/blob/master/"
const Sample = ({title, sourcePath, children}) => {
  const style = {
    borderRadius: 4,
    border: "solid #ccc 1px",
    width: "100vw",
    padding: 10,
    margin: "10px 0",
    boxSizing: "border-box"
  }
  return <div style={style}>
    <h2>{title}</h2>
    {children}
    <hr />
    <a href={`${baseUrl}/${sourcePath}`}>Source Code ({sourcePath})</a>
  </div>
}
class App extends Component {
  render() {
    return <div>
      <h1>redux-candy Example</h1>
      <Sample title={"Counter Example"} sourcePath={"example/src/Counter.js"}>
        <Counter />
      </Sample>
      <Sample title={"Todo Example"} sourcePath={"example/src/Todo.js"}>
        <Todo />
      </Sample>
      <a href="//github.com/inuscript/redux-candy">Github</a>
    </div>
  }
}

export default App;
