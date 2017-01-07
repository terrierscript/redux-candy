import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { createReducer, createAction } from 'redux-candy'

const initialState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL'
}

// God reducer
const reducer = createReducer(initialState)

let nextTodoId = 0
const creteNewTodo = (text) => ({
  text,
  id: nextTodoId++,
  completed: false
})

const addTodo = createAction('ADD_TODO', 'todos', (todos, text) => (
  [ ...todos, creteNewTodo(text) ]
) )

const toggleTodoComplete = (todo, id ) => {
  if(todo.id !== id){
    return todo
  }
  return Object.assign({}, todo, {
    completed: !todo.completed
  })
}

const toggleTodo = createAction('TOGGLE_TODO', 'todos', (todos, id) => (
  todos.map( todo => toggleTodoComplete(todo, id) )
) )

const setVisibilityFilter = createAction('SET_VISIBILITY_FILTER', 'visibilityFilter')

const Todo = ({ onClick, completed, text, id }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none'}}
  >
    {id}: {text}
  </li>
)

const TodoList = ({ todos, dispatch }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => dispatch(toggleTodo(todo.id))}
      />
    )}
  </ul>
)

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

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >{children}</a>
  )
}

const Footer = ( { dispatch } ) => (
  <p>
    Show:
    {" "}
    <Link onClick={ () => dispatch(setVisibilityFilter("SHOW_ALL")) }>
      All
    </Link>
    {", "}
    <Link onClick={ () => dispatch(setVisibilityFilter("SHOW_ACTIVE")) }>
      Active
    </Link>
    {", "}
    <Link onClick={ () => dispatch(setVisibilityFilter("SHOW_COMPLETED")) }>
      Completed
    </Link>
  </p>
)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const todoMapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const TodoListContainer = connect(todoMapStateToProps)(TodoList)
const AddTodoContainer = connect(state => state)(AddTodo)
const FooterContainer = connect(state => state)(Footer)

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
          <FooterContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
