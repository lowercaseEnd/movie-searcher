<template>
  <div class="home">
    <div v-if="this.$route.name === 'home'">
      <MovieList v-bind:movies="getMovies" />
      <Pages />
    </div>

    <MovieList v-else v-bind:movies="favourites" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  // import MovieList from "@/components/MovieList";
  // import Pages from "@/components/Pages";
  const MovieList = () => import("@/components/MovieList");
  const Pages = () => import("@/components/Pages");

  export default {
    name: "home",
    components: {
      MovieList,
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
    // mounted() {
    //   },
    beforeRouteEnter (to, from, next) {
      // this.fetchMovieList();
      next(vm => {
        vm.fetchMovieList();
      })
    }
  };
</script>

<style>
</style>
