const API_KEY = "60e1831dec35a216fdaff508cdf5675c";
//module for getting recommendations and similar movies
export default {
  state: {
    similarMovies: [],
    recommendedMovies: []
  },
  actions: {
    async fetchSimilarMovies(context, {id, key}) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/${key}?api_key=${API_KEY}&language=en-US&page=1`
      );
      const movies = await response.json();
      //just to prevent errors
      if(!key) {
        key = "similar";
      }
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
