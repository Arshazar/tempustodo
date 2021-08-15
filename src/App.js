import './styles/globals.css'
import { TodoList } from './components'
import { TodoListProvider } from './providers/TodoListProvider'

const App = () => (
    <div className="App">
      <header>
        <h1>Todo list</h1>
      </header>
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    </div>
  )

export { App }
