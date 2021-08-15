import React, { createContext, useReducer, useEffect } from 'react'
import { todoListReducer } from '../reducers/todoListReducer'
import { updateDB } from '../utils/localStrorage'

const TodoListContext = createContext()
const SetTodoListContext = createContext()

const TodoListProvider = ({ children, initialTodoList = [] }) => {
  const [state, dispatch] = useReducer(todoListReducer, { list: initialTodoList, focused: null })

  useEffect(() => {
    updateDB(state.list)
  }, [state.list])

  return (
    <TodoListContext.Provider value={state}>
      <SetTodoListContext.Provider value={{ dispatch }}>{children}</SetTodoListContext.Provider>
    </TodoListContext.Provider>
  )
}

export { TodoListContext, SetTodoListContext, TodoListProvider }
