import { useContext } from 'react'
import { TodoListContext, SetTodoListContext } from '../providers'

const useTodoList = (withDispatch = false) => {
  const state = useContext(TodoListContext)
  const { dispatch } = useContext(SetTodoListContext)

  const states = {
    ...state
  }

  return withDispatch ? [states, dispatch] : states
}

export { useTodoList }
