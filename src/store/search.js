const API_KEY = "60e1831dec35a216fdaff508cdf5675c"

export default {
  state: {
    movies: {},
    query: "",
    page: 1
  },
  actions: {
    async fetchMovieList(context) {
      let query = context.getters.getQuery || "psycho";
      let page = context.getters.getPage;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
      );
      const movies = await response.json();

      context.commit("writeMovies", movies);
    },
    setQuery(context, query) {
      context.commit("saveQuery", query);
    },
    setPage(context, page) {
      context.commit("savePage", page);
    }
  },
  mutations: {
    writeMovies(state, movies) {
      state.movies = movies;
    },
    saveQuery(state, query) {
      state.query = query;
    },
    savePage(state, page) {
      state.page = page;
    }
  },
  getters: {
    getMovies(state) {
      return state.movies.results;
    },
    getPages(state) {
      return state.movies;
    },
    getQuery(state) {
      return state.query;
    },
    getPage(state) {
      return state.page;
    }
  }
};
