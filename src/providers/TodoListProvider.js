import React, { createContext, useReducer, useEffect } from 'react'
import { todoListReducer } from '../reducers/todoListReducer'
import { updateDB, readDB } from '../utils/localStrorage'

const TodoListContext = createContext()
const SetTodoListContext = createContext()

const TodoListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoListReducer, { list: readDB() || [], focused: null })

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
