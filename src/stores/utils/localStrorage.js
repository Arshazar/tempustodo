const storage = window.localStorage

const createDB = () => {
  storage.setItem('todoList', [])
}

const readDB = () => {
  return JSON.parse(storage.getItem('todoList'))
}

const addItem = (item) => {
  const list = readDB()
  storage.setItem('todoList', JSON.stringify([...list, item]))
}

const deleteItem = (id) => {
  const newList = JSON.parse(storage.getItem('todoList')).filter((todo) => {
    if (todo.id !== id) {
      return todo
    }
  })
  storage.setItem('todoList', JSON.stringify(newList))
}

const editItem = (id, text) => {
  const list = readDB()
  const newList = list.map((todo) => {
    if (todo.id === id) {
      return { id, task: text }
    }
    return todo
  })
  storage.setItem('todoList', JSON.stringify(newList))
}

export { createDB, readDB, addItem, deleteItem, editItem }
