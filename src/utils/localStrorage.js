const storage = window.localStorage

const readDB = () => {
  return JSON.parse(storage.getItem('todoList'))
}

const updateDB = (data) => {
  storage.setItem('todoList', JSON.stringify(data))
}

export { readDB, updateDB }
