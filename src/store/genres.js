export default {
  state: {
    genres: {}
  },
  actions: {
    async fetchMovieGenres({commit, rootState}) {
      let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${rootState.global.personalApiKey}&language=en-US`;
      let res = await fetch(url);
      let genres = await res.json();

      commit("saveGenres", genres);
    }
  },
  mutations: {
    saveGenres(state, genres) {
      state.genres = genres;
    }
  },
  getters: {
    getGenres(state) {
      return state.genres.genres;
    }
  }
}