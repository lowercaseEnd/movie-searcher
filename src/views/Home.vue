<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Search />
    <MovieList 
      v-bind:movies="getMovies"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";

export default {
  name: 'home',
  components: {
    MovieList,
    Search
  },
  methods: mapActions(["fetchMovieList"]),
  computed: mapGetters(["getMovies"]),
  mounted() {
    this.fetchMovieList();
  }
}
</script>
