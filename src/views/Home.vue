<template>
  <div class="home">
    <!-- <Search /> -->
      <MovieList v-bind:movies="getMovies" />
      <Pages />
    <!-- <MovieList v-else v-bind:movies="favourites" /> -->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import MovieList from "@/components/MovieList";
  import Search from "@/components/Search";
  import Pages from "@/components/Pages";

  export default {
    name: "home",
    components: {
      MovieList,
      Search,
      Pages
    },
    methods: mapActions(["fetchMovieList"]),
    computed: {
      ...mapGetters(["getMovies"]),
      },
    mounted() {
      this.fetchMovieList();
    }
  };
</script>

<style>
  .home {
    /* background-color: #e3e7f1; */
  }
</style>
