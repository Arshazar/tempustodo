class Utils {
  isMac() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0
  }
}

const utils = new Utils()
export { utils }
