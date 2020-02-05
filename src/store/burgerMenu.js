export default {
  state: {
    isButtonActive: false
  },
  mutations: {
    toggleButton(state) {
      state.isButtonActive = !state.isButtonActive;
    }
  },
  getters: {
    getButtonState(state) {
      return state.isButtonActive;
    }
  }
}