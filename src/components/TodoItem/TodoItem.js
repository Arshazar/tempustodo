import { useEffect, useRef, useState } from 'react'

import s from './TodoItem.module.css'
import { useTodoList } from '../../hooks'
import { focusOn, edit, remove, setStatus } from '../../actions/todoListActions'

function moveCaret(el) {
  const target = document.createTextNode('')
  el.appendChild(target)
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var selection = window.getSelection()
    if (selection !== null) {
      var range = document.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    if (el instanceof HTMLElement) el.focus()
  }
}

const TodoItem = ({ id, task, done }) => {
  const [text, setText] = useState('')
  const [{ focused }, dispatch] = useTodoList(true)
  const inputRef = useRef()

  useEffect(() => {
    dispatch(edit(text))
  }, [text])

  useEffect(() => {
    if (task !== text) {
      setText(task)
      inputRef.current.innerText = task
    }
  }, [task])

  useEffect(() => {
    const thisFocused = inputRef.current === document.activeElement
    if (focused === id && !thisFocused) {
      inputRef.current.focus()
      moveCaret(inputRef.current)
    }
  }, [focused])

  return (
    <div key={id}>
      <div className={s.item}>
        <a href="/">{'\u2022'}</a>
        <div
          className={s.textSpan}
          style={{ textDecoration: done ? 'line-through' : 'none' }}
          ref={inputRef}
          contentEditable
          onInput={() => setText(inputRef.current.innerText)}
          onFocus={() => dispatch(focusOn(id))}
          onBlur={() => {
            dispatch(focusOn(null))
            inputRef.current.innerHTML = text
          }}>
          {task}
        </div>
        <button className={s.toolBtn} onClick={() => dispatch(setStatus(id))}>
          {done ? 'Undone' : 'Done'}
        </button>
        <button className={s.toolBtn} onClick={() => dispatch(remove(id))}>
          delete
        </button>
      </div>
      <span className={s.spacer} />
    </div>
  )
}

export { TodoItem }
