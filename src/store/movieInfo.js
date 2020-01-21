//module for getting extended info about movie
export default {
  state: {
    movie: {}
  },
  mutations: {
    saveMovie(state, movie) {
      state.movie = movie;
    }
  },
  actions: {
    async fetchMovieInfo({commit, rootState}, id) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${rootState.global.personalApiKey}&language=en-US`
      );
      const movie = await res.json();

      commit("saveMovie", movie);
    }
  },
  getters: {
    getMovie(state) {
      return state.movie;
    }
  }
}