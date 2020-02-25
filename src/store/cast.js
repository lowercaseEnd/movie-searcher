//module for getting information about cast
export default {
  state: {
    cast: []
  },
  actions: {
    async fetchCast({commit, rootState}, id) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${rootState.global.personalApiKey}`
      );
      const crew = await response.json();

      commit("writeCastMovies", crew.cast);
    }
  },
  mutations: {
    writeCastMovies(state, cast) {
      state.cast = cast;
    }
  },
  getters: {
    getCast(state) {
      return state.cast;
    }
  }
};
