export const Actions = state => ({
  addFlashMessage: (message, key) => {
    if (!key) {
      key = (Math.random() + 1).toString(36).substring(8)
    }
    state.flashMessages.push({ key, message })
  },
  getFlashMessages: () => state.flashMessages,
  deleteFlashMessage: (key) => {
    const index = state.flashMessages.findIndex(alert => {
      return alert.key === key;
    });
    state.flashMessages.splice(index, 1)
  }
});
