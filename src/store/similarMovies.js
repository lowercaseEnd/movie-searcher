const API_KEY = "60e1831dec35a216fdaff508cdf5675c"

export default {
  state: {
    similarMovies: []
  },
  actions: {
      async fetchSimilarMovies(context, id) {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
          const movies = await response.json();

          context.commit("writeSimilarMovies", movies.results);
      }
  },
  mutations: {
      writeSimilarMovies(state, movies) {
          state.similarMovies = movies;
      }
  },
  getters: {
      getSimilarMovies(state) {
          return state.similarMovies;
      }
  }
}