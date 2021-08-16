const add = () => ({ type: 'add' })

const remove = (id) => ({ type: 'remove', payload: id })

const edit = (task) => ({ type: 'edit', payload: task })

const focusOn = (id) => ({ type: 'focusOn', payload: id })

const setStatus = (id) => ({ type: 'setStatus', payload: id })

export { add, remove, edit, focusOn, setStatus }
