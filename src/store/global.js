//everything that is user multiple times in vuex

export default {
  state: {
    personalApiKey: "60e1831dec35a216fdaff508cdf5675c",
    isLoading: false
  },
  mutations: {
    changeLoadingState(state, value) {
      state.isLoading = value;
    }
  },
  getters: {
    getLoadingState(state) {
      return state.isLoading;
    }
  }
}