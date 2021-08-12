import { TodoList } from './components'
import { TodoListProvider } from './stores/TodoListProvider'

import './styles/globals.css'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Todo list</h1>
      </header>
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    </div>
  )
}

export { App }
