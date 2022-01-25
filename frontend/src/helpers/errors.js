export const errors = {
  /**
   * @type {Object.<string, string>}
   */
  errors: {},

  /**
   * @param {string} fieldName
   * @returns {boolean}
   */
  has(fieldName) {
    return typeof errors.errors[fieldName] !== 'undefined'
  },

  /**
   * @param {string} fieldName
   * @returns {string}
   */
  get(fieldName) {
    return errors.errors[fieldName] ?? ''
  },

  /**
   * @param {string} fieldName
   */
  clear(fieldName) {
    delete errors.errors[fieldName]
  },

  clearAll() {
    errors.errors = {}
  }
}
