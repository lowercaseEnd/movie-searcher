<template>
  <form v-on:submit.prevent="">
    <input id="search" class="movie-search" v-on:keyup.enter="search" type="text" v-model.trim="input" placeholder="Search">
    <label for="search" class="visually-hidden"></label>
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
    width: 100%;
    height: 30px;
    padding: 2px 4px;
    background-color: #424242;
    color: #ffffff;
    border: none;
    margin-bottom: 20px;
  }
  .visually-hidden {
    position: absolute !important;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>