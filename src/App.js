import './styles/globals.css'
import { TodoList } from './components'
import { TodoListProvider } from './providers/TodoListProvider'
import { readDB } from './utils/localStrorage'

const App = () => {
  const initialTodoList = readDB() || []

  return (
    <div className="App">
      <header>
        <h1>Todo list</h1>
      </header>
      <TodoListProvider initialTodoList={initialTodoList}>
        <TodoList />
      </TodoListProvider>
    </div>
  )
}

export { App }
