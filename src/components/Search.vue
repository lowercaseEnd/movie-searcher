<template>
  <form v-on:submit.prevent="">
    <input v-on:keyup.enter="search" type="text" v-model.trim="input" placeholder="Search">
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
      this.setQuery(this.input);
      this.setPage(1);
      this.fetchMovieList();
      this.input = "";
    }
  }
}
</script>