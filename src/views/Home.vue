<template>
  <div class="home">
    <!-- <Search /> -->
    <div v-if="this.$route.name === 'home'">
      <MovieList v-bind:movies="getMovies" />
      <Pages />
    </div>

    <MovieList v-else v-bind:movies="favourites" />
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
      favourites() {
        let favs = JSON.parse(localStorage.getItem("favourites"));
        return favs;
      }
    },
    mounted() {
      this.fetchMovieList();
      // let favs =
    }
  };
</script>

<style>
  .home {
    /* background-color: #e3e7f1; */
  }
</style>
