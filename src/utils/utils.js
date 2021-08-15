class Utils {
  isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0
  }
  moveCaret(el) {
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
}

const utils = new Utils()
export { utils }
