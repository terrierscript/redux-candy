import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { createReducer, createAction } from 'redux-candy'

const initialState = {
  todos: [],
  todoCompletes: {},
}

const reducer = createReducer(initialState)

let nextTodoId = 0

const creteNewTodo = (text) => ({
  text,
  id: nextTodoId++,
  completeFlag: false
})

const addTodo = createAction('ADD_TODO', 'todos', (todos, text) => (
  [ ...todos, creteNewTodo(text) ]
) )

const toggleTodo = createAction('ADD_TODO', (id) => ({
  todoCompletes: {
    [id]: (flag) => {
      return !flag
    }
  }
}))

const Todo = ({ onClick, completed, text, id }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none'}}
  >
    {id}: {text}
  </li>
)

const TodoList = ({ todos, todoCompletes, dispatch }) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          completed={todoCompletes[todo.id]}
          {...todo}
          onClick={() => dispatch(toggleTodo(todo.id))}
        />
      )}
    </ul>
  )
}

const AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

const todoMapStateToProps = (state) => state

const TodoListContainer = connect(todoMapStateToProps)(TodoList)
const AddTodoContainer = connect(state => state)(AddTodo)

class App extends Component {
  constructor(){
    super()
    this.store = createStore(reducer)
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <AddTodoContainer />
          <TodoListContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
