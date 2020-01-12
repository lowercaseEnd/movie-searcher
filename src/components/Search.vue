<template>
  <form v-on:submit.prevent="">
    <input v-on:keyup.enter="search(input)" type="text" v-model.trim="input" placeholder="Search">
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
    ...mapActions(["fetchMovieList"]),
    search(query) {
      this.fetchMovieList(query);
    }
  }
}
</script>