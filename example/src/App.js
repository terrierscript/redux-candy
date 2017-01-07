import React, { Component } from 'react';
import Counter from './example/Counter'
import Todo from './example/Todo'
import Todo2 from './example/Todo2'
import Demo from './Demo'

const raw = "https://raw.githubusercontent.com/inuscript/redux-candy/master"
const baseUrl = "https://github.com/inuscript/redux-candy/blob/master"

const Sample = ({title, sourcePath, children}) => {

  return <div>
    <h2>{title}</h2>
    <a href={`${baseUrl}/${sourcePath}`}>Source Code ({sourcePath})</a>
    <Demo sourceUrl={`${raw}/${sourcePath}`}>{children}</Demo>
    <hr />
  </div>
}
class App extends Component {
  render() {
    return <div>
      <h1>redux-candy Example</h1>
      <Sample title={"Counter Example"} sourcePath={"example/src/example/Counter.js"}>
        <Counter />
      </Sample>
      <Sample title={"Todo Example"} sourcePath={"example/src/example/Todo.js"}>
        <Todo />
      </Sample>
      <Sample title={"Todo Example 2"} sourcePath={"example/src/example/Todo2.js"}>
        <Todo2 />
      </Sample>
      <a href="//github.com/inuscript/redux-candy">Github</a>
    </div>
  }
}

export default App;
