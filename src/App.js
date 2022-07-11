import React, { useState, useRef, useEffect }  from 'react';
import { TodoList } from "./TodoList.js";
import uuidv4 from "uuid/v4"

const LOCAL_STORAGE_KEY = "todoApp.todos"

// we are going to be making a simple todo list app using react
function App() {
  const [todos, setTodos] = useState([]) //the first parameter in the array after const is the todos in our array and the seond one is the function we use to set our todos
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
  const name = todoNameRef.current.value
  if(name === "") return
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4() , name: name, complete: false }]
  })
  todoNameRef.current.value = null //this clears the input field after we press the add button
  }
  
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
    
  }

  return (
    <div>
      <TodoList todos = {todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left Todos</div>
    </div>
  )
}

export default App;
