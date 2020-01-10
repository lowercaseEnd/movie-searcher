const API_KEY = "60e1831dec35a216fdaff508cdf5675c";

export default {
  state: {
    similarMovies: [],
    recommendedMovies: []
  },
  actions: {
    async fetchSimilarMovies(context, {id, key}) {
      console.log(`Key: ${key} for id: ${id}`);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/${key}?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movies = await response.json();

      let fun = key === "similar" ? "writeSimilarMovies" : "writeRecommendedMovies"

      context.commit(fun, movies.results);
    }
  },
  mutations: {
    writeSimilarMovies(state, movies) {
      state.similarMovies = movies;
    },
    writeRecommendedMovies(state, movies) {
      state.recommendedMovies = movies;
    }
  },
  getters: {
    getSimilarMovies(state) {
      return state.similarMovies;
    },
    getRecommendedMovies(state) {
      return state.recommendedMovies;
    }
  }
};
