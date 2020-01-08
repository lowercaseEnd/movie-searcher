<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MovieList 
      v-bind:movies="getMovies"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import MovieList from "@/components/MovieList";

export default {
  name: 'home',
  components: {
    MovieList
  },
  methods: mapActions(["fetchMovieList"]),
  computed: mapGetters(["getMovies"]),
  mounted() {
    this.fetchMovieList();
  }
}
</script>
