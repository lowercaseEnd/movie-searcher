const API_KEY = "60e1831dec35a216fdaff508cdf5675c";

export default {
  state: {
    config: {}
  },
  actions: {
    async fetchConfig(context) {
      let url = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;
      let res = await fetch(url);

      let config = await res.json();

      context.commit("saveConfig", config);
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
