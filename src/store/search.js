//module for getting search results from tmdb
export default {
  state: {
    movies: {},
    query: "",
    page: 1
  },
  actions: {
    async fetchMovieList({getters, commit, rootState}) {
      let searchString = "";
      let page = getters.getPage;
      let query = getters.getQuery;
      
      //if user input search query then display popular movies
      if(query) {
        searchString = `https://api.themoviedb.org/3/search/movie?api_key=${rootState.global.personalApiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
      } else {
        searchString = `https://api.themoviedb.org/3/movie/popular?api_key=${rootState.global.personalApiKey}&language=en-US&page=${page}`;
      }
      
      const response = await fetch(searchString);
      const movies = await response.json();

      commit("writeMovies", movies);
    },
    //save query so pagination is possible
    setQuery(context, query) {
      context.commit("saveQuery", query);
    },
    //change page
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
