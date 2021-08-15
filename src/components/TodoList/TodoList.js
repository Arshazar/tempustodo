import { useRef, useEffect } from 'react'

import s from './TodoList.module.css'
import { useTodoList } from '../../hooks'
import { add, remove, focusOn } from '../../actions/todoListActions'
import { TodoItem } from '..'
import { utils } from '../../utils'

const TodoList = () => {
  const [{ list, focused }, dispatch] = useTodoList(true)
  const downKeys = useRef([])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [focused])

  const handleKeyUp = () => {
    downKeys.current = []
  }

  const handleKeyDown = (e) => {
    downKeys.current.push(e.key)
    const [keyOne, keyTwo, keyThree] = downKeys.current
    const focusedItemIndex = list.findIndex(({ id }) => id === focused)
    const nextItem = list.find((_item, i) => i === focusedItemIndex + 1)

    if (focused && e.key === 'Enter') {
      dispatch(add())
    } else if (
      keyOne === (utils.isMac() ? 'Meta' : 'Control') &&
      keyTwo === 'Shift' &&
      keyThree === (utils.isMac() ? 'Backspace' : 'Delete')
    ) {
      e.preventDefault()
      focused && dispatch(remove())
    } else if (focused && e.key === 'Tab') {
      dispatch(focusOn(nextItem.id))
    }
  }

  return (
    <div className={s.list}>
      {list.map((item) => (
        <TodoItem {...item} />
      ))}
      <button className={s.addButton} onClick={() => dispatch(add())}>
        +
      </button>
    </div>
  )
}

export { TodoList }
