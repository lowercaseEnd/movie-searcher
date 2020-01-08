import Vue from "vue";
import Vuex from "vuex";
import similarMovies from "./similarMovies";

Vue.use(Vuex);
const API_KEY = "60e1831dec35a216fdaff508cdf5675c"

export default new Vuex.Store({
    state: {
        movies: []
    },
    actions: {
        async fetchMovieList(context, query = "psycho") {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
            const movies = await response.json();

            context.commit("writeMovies", movies.results);
        }
    },
    mutations: {
        writeMovies(state, movies) {
            state.movies = movies;
        }
    },
    getters: {
        getMovies(state) {
            return state.movies;
        }
    },
    modules: {
        similarMovies,
    }
})