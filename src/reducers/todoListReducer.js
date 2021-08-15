const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const list = [...state.list]
      const newId = `item-${Date.now()}`
      return { ...state, list: [...list, { id: newId, task: '', done: false }], focused: newId }

    case 'edit':
      const newTodoList = state.list.map((item) => {
        if (item.id === state.focused) {
          return { ...item, task: action.payload }
        }
        return item
      })

      return {
        ...state,
        list: newTodoList
      }

    case 'remove':
      const targetId = action.payload || state.focused
      let index = null
      const newList = state.list.filter(({ id }, i) => {
        if (id === targetId) {
          index = i
        }
        return id !== targetId
      })

      return {
        ...state,
        list: newList,
        focused: newList[index - 1]?.id || null
      }

    case 'focusOn': {
      return {
        ...state,
        focused: action.payload
      }
    }

    case 'setStatus':
      return {
        ...state,
        list: state.list.map(({ id, task, done }) => {
          if (id === action.payload) return { id, task, done: !done }
          return { id, task, done }
        })
      }

    default: {
      console.log(`Error at ${action.type}`)
    }
  }
}

export { todoListReducer }
