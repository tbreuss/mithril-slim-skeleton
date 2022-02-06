export const session = {
  getString: (key, defaultValue) => {
    const str = window.sessionStorage.getItem(key)
    return str ? str : defaultValue;
  },
  setString: (key, string) => {
    window.sessionStorage.setItem(key, string)
  },
  /**
   * @param {string} key
   * @param {number} defaultValue
   * @returns {number}
   */
  getInteger: (key, defaultValue) => {
    const integer = window.sessionStorage.getItem(key)
    return integer ? parseInt(integer) : defaultValue;
  },
  /**
   * @param {string} key
   * @param {number} integer
   * @returns
   */
  setInteger: (key, integer) => {
    window.sessionStorage.setItem(key, integer.toString())
  }
}
