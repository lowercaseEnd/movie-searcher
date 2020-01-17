import Vue from "vue";
import Vuex from "vuex";
import similarMovies from "./similarMovies";
import cast from "./cast";
import search from "./search";
import movieInfo from "./movieInfo";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        similarMovies,
        cast,
        search,
        movieInfo,
    }
})