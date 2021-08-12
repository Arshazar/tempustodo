import React, { useState, createContext } from 'react'

const TodoListContext = createContext()
const SetTodoListContext = createContext()

const TodoListProvider = ({ children }) => {
  const [list, setList] = useState([])
  return (
    <TodoListContext.Provider value={list}>
      <SetTodoListContext.Provider value={{ setList }}>{children}</SetTodoListContext.Provider>
    </TodoListContext.Provider>
  )
}

export { TodoListContext, SetTodoListContext, TodoListProvider }
