import Vue from "vue";
import Vuex from "vuex";
import similarMovies from "./similarMovies";
import cast from "./cast";
import search from "./search";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        similarMovies,
        cast,
        search
    }
})