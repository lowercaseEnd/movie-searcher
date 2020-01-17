const API_KEY = "60e1831dec35a216fdaff508cdf5675c";
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
    async fetchMovieInfo(context, id) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const movie = await res.json();

      context.commit("saveMovie", movie);
    }
  },
  getters: {
    getMovie(state) {
      return state.movie;
    }
  }
}