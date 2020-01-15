<template>
  <li v-on:click="openPage">
    <!-- {{ movie }} -->
    <img v-bind:src="image" />
    <h3>{{ movie.title }}</h3>
  </li>
</template>

<script>
  import {mapActions} from "vuex";
  export default {
    props: {
      movie: {
        type: Object
      }
    },
    methods: {
      ...mapActions(["fetchMovieInfo"]),
      openPage() {
        this.$router.push({
          name: "description page",
          params: { id: this.movie.id }
        });
        this.fetchMovieInfo(this.$route.params.id);
      }
    },
    computed: {
      image() {
        let config = JSON.parse(localStorage.getItem("config"));
        return (
          config.images.secure_base_url +
          config.images.backdrop_sizes[0] +
          this.movie.poster_path
        );
      }
    }
  };
</script>
