import { useContext, useRef, createRef, useEffect, useState } from 'react'
import { SetTodoListContext, TodoListContext } from '../../stores/TodoListProvider'
import { addItem, createDB, deleteItem, editItem, readDB } from '../../stores/utils/localStrorage'

import s from './TodoList.module.css'

const TodoList = () => {
  let { setList } = useContext(SetTodoListContext)
  const list = useContext(TodoListContext)
  const elRefs = useRef([])
  const [activeEl, setActiveEl] = useState(document.activeElement)

  const handleFocusIn = (e) => {
    setActiveEl(document.activeElement)
  }

  if (elRefs.current.length !== list.length) {
    // add or remove refs
    elRefs.current = Array(list.length)
      .fill()
      .map((_, i) => elRefs.current[i] || createRef())
  }

  const handleAddItem = () => {
    const newItem = { id: list.length + 1, task: '', done: false }
    addItem(newItem)
    setList([...list, newItem])
  }

  const handleEditItem = (text, id, done) => {
    const newList = list.map((todo) => {
      if (todo.id === id) {
        return { id: todo.id, task: text, done }
      }
      return todo
    })
    setList(newList)
    editItem(id, text)
  }

  const handleDeleteItem = (id) => {
    const newList = list
      .filter((todo) => {
        if (todo.id !== id) {
          return todo
        }
      })
      .map((todo, i) => {
        return { id: i + 1, task: todo.task }
      })
    setList(newList)
    deleteItem(id)
  }

  const handleOptionsVisibility = (i, status) => {
    elRefs.current[i].current.children[0].style.visibility = status
  }

  useEffect(() => {
    if (!readDB()) createDB()
  })

  useEffect(() => {
    console.log(readDB)
    if (document) {
      document.addEventListener('focusin', handleFocusIn)
      return () => {
        document.removeEventListener('focusin', handleFocusIn)
      }
    }
  })

  useEffect(() => {
    if (document) {
      const parentEl = activeEl.parentElement
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'Delete') {
          const deletedEl = elRefs.current.filter((ref) => {
            if (parentEl === ref.current) {
              return ref
            }
          })
          const newList = list.filter((todo) => {
            if (todo.id !== Number(deletedEl[0].current.id)) {
              return todo
            }
          })
          setList(newList)
        }
      })
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          parentEl.nextSibling.children[2].focus()
        }
      })
    }
  })

  return (
    <div className={s.list}>
      {list.length
        ? list.map((todo, i) => {
            return (
              <>
                <div
                  className={s.item}
                  key={todo.id}
                  id={todo.id}
                  ref={elRefs.current[i]}
                  onMouseOut={() => handleOptionsVisibility(i, 'hidden')}
                  onMouseOver={() => handleOptionsVisibility(i, 'visible')}>
                  <span className={s.optionClick}>
                    {'\u2022'}
                    {'\u2022'}
                    {'\u2022'}
                  </span>
                  <a href="/">{'\u2022'}</a>
                  <span
                    className={s.textSpan}
                    style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                    contentEditable
                    onInput={(e) => handleEditItem(e.target.innerText, todo.id, todo.done)}>
                    {todo.task}
                  </span>
                  <button
                    className={s.toolBtn}
                    onClick={() => handleEditItem(todo.task, todo.id, !todo.done)}>
                    {todo.done ? 'Undone' : 'Done'}
                  </button>
                  <button className={s.toolBtn} onClick={() => handleDeleteItem(todo.id)}>
                    delete
                  </button>
                </div>
                <span className={s.spacer} />
              </>
            )
          })
        : null}
      <button className={s.addButton} onClick={handleAddItem}>
        +
      </button>
    </div>
  )
}

export { TodoList }
