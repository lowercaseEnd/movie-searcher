const API_KEY = "60e1831dec35a216fdaff508cdf5675c";
//module for getting information about cast
export default {
  state: {
    cast: []
  },
  actions: {
    async fetchCast(context, id) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const crew = await response.json();

      context.commit("writeCastMovies", crew.cast);
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
