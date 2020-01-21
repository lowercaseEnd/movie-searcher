export default {
  state: {
    config: {}
  },
  actions: {
    async fetchConfig({commit, rootState}) {
      let url = `https://api.themoviedb.org/3/configuration?api_key=${rootState.global.personalApiKey}`;
      let res = await fetch(url);

      let config = await res.json();

      commit("saveConfig", config);
    }
  },
  mutations: {
    saveConfig(state, config) {
      state.config = config;
    }
  },
  getters: {
    getConfig(state) {
      return state.config.images;
    }
  }
};
