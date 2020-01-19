<template>
  <form v-on:submit.prevent="">
    <input class="movie-search" v-on:keyup.enter="search" type="text" v-model.trim="input" placeholder="Search">
  </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      input: ""
    }
  },
  methods: {
    ...mapActions(["fetchMovieList", "setQuery", "setPage"]),
    search() {
      // console.log(this.$route.name);
      if(this.$route.name === "description page") {
        this.$router.push({name: "home"});
      }
      this.setQuery(this.input);
      this.setPage(1);
      this.fetchMovieList();
      this.input = "";
    }
  }
}
</script>

<style>
  .movie-search {
    width: 296px;
    height: 20px;
    margin-bottom: 20px;
  }
  @media (min-width: 830px) {
    .movie-search {
      width: 462px;
      margin-bottom: 0;
    }
  }
  @media (min-width: 1230px) {
    .movie-search {
      width: 862px;
    }
  }
</style>